import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const REQUEST_TIMEOUT = 20000

export class FetchError extends Error {
    status: number
    statusText: string
    ok: boolean
    config: AxiosRequestConfig
    code?: string
    request?: any
    response?: AxiosResponse

    constructor(response: any) {
        super(response.statusText)

        this.status = response.status
        this.statusText = response.statusText
        this.ok = response.ok
        this.config = response.config
        this.code = response.status
        this.request = response.request
        this.response = response

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, FetchError.prototype)
    }
}

interface ApiOptions {
    apiVersion?: string

    [index: string]: any
}

type PostFetchConfig = {
    allowedCodes?: number[]
    responseType?: ResponseType
}

function checkStatus(responseConfig: PostFetchConfig) {
    return (response: any) => {
        if (response) {
            if (responseConfig.allowedCodes) {
                if (responseConfig.allowedCodes.indexOf(response.status) >= 0) {
                    return response.data
                } else {
                    throw new FetchError(response)
                }
            } else if (response.status >= 200 && response.status < 300) {
                return response.data
            }
            throw new FetchError(response)
        }
    }
}

function checkStatusError(error: AxiosError) {
    if (!error.response) {
        throw new FetchError({ ok: false })
    }
    throw new FetchError(error.response)
}

function request(url, options, responseConfig: PostFetchConfig = {}) {
    return Axios({
        ...options,
        url: url,
        data: options.body,
        headers: {
            ...options.headers,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(checkStatus(responseConfig))
        .catch((err: any) => checkStatusError(err))
}

function getParams(params?: any) {
    if (!params) {
        return ''
    }
    const paramsArray: string[] = []

    Object.keys(params).map((key: string) => {
        if (params[key] || params[key] === 0) {
            if (Array.isArray(params[key]) && (isEncodedArray(params[key][0]) || isNaN(params[key][0]))) {
                params[key].map((singleParam: any) => {
                    paramsArray.push(`${key}=${singleParam}`)
                })
            } else {
                paramsArray.push(`${key}=${params[key]}`)
            }
        }
    })

    return `?${paramsArray.join('&')}`
}

export default function api(url, options: ApiOptions, params?: any, responseConfig?: PostFetchConfig) {
    let otherOptions = options

    if (options.apiVersion) {
        ;({ ...otherOptions } = options)
    }

    if (url.slice(0, 1) !== '/') {
        url = '/' + url
    }

    return request(
        `${options.url}${url}${getParams(params)}`,
        {
            ...otherOptions,
            timeout: REQUEST_TIMEOUT,
            headers: {
                ...otherOptions.headers,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        responseConfig,
    )
}

export function isEncodedArray(value: string) {
    const decodedValue = decodeURIComponent(value)
    const firstChar = decodedValue.substring(0, 1)
    const lastChar = decodedValue.slice(-1)

    return firstChar === '[' && lastChar === ']'
}
