export const _isJson = (str: unknown): str is string => {
    try {
        JSON.parse(<any>str)
        return true
    } catch (e) {
        return false
    }
}
export const _isNumber = (num: unknown): num is number => {
    try {
        return isNaN(Number(num)) ? false : true
    } catch (e) {
        return false
    }
}

export const _get: TypedExtractor = (obj: any, ...keys: (string | number)[]): string | number | Object | undefined => {
    let newObj: typeof obj = _isJson(obj) ? JSON.parse(obj) : obj

    for (const key of keys) {
        if (_isNumber(key) && Array.isArray(newObj)) {
            newObj = newObj[key]
            continue
        } else if (!key) {
            return undefined
        } else if (!newObj) {
            return undefined
        } else if (!newObj[key]) {
            return undefined
        } else if (_isJson(newObj[key])) {
            newObj = JSON.parse(newObj[key])
            continue
        } else {
            newObj = newObj[key]
            continue
        }
    }
    return newObj
}

export const _castArray = (arr: unknown) => {
    return Array.isArray(arr) ? arr : [arr]
}
export const _size = (val: unknown) => {
    if (Array.isArray(val)) {
        return val.length
    }
    if (typeof val === 'object') {
        return Object.keys(val).length
    }
    if (typeof val === 'string') {
        return val.length
    }
    return null
}

export const _isObject = (val: any): val is object => {
    return typeof val === 'object'
}

export const _invert = (obj: object) => {
    const newObj: { [key: string]: any } = {}
    Object.keys(obj).map((key) => {
        newObj[obj[key]] = key
    })
    return newObj
}

export interface TypedExtractor {
    <T, K1 extends keyof T>(object: T, key1: K1): T[K1]
    <T, K1 extends keyof T, K2 extends keyof T[K1]>(object: T, key1: K1, key2: K2): T[K1][K2]
    <T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(object: T, key1: K1, key2: K2, key3: K3): T[K1][K2][K3]
    <T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3]>(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3,
        key4: K4,
    ): T[K1][K2][K3][K4]
    <
        T,
        K1 extends keyof T,
        K2 extends keyof T[K1],
        K3 extends keyof T[K1][K2],
        K4 extends keyof T[K1][K2][K3],
        K5 extends keyof T[K1][K2][K3][K4]
    >(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3,
        key4: K4,
        key5: K5,
    ): T[K1][K2][K3][K4][K5]
    <
        T,
        K1 extends keyof T,
        K2 extends keyof T[K1],
        K3 extends keyof T[K1][K2],
        K4 extends keyof T[K1][K2][K3],
        K5 extends keyof T[K1][K2][K3][K4],
        K6 extends keyof T[K1][K2][K3][K4][K5]
    >(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3,
        key4: K4,
        key5: K5,
        key6: K6,
    ): T[K1][K2][K3][K4][K5][K6]
    <
        T,
        K1 extends keyof T,
        K2 extends keyof T[K1],
        K3 extends keyof T[K1][K2],
        K4 extends keyof T[K1][K2][K3],
        K5 extends keyof T[K1][K2][K3][K4],
        K6 extends keyof T[K1][K2][K3][K4][K5],
        K7 extends keyof T[K1][K2][K3][K4][K5][K6]
    >(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3,
        key4: K4,
        key5: K5,
        key6: K6,
        key7: K7,
    ): T[K1][K2][K3][K4][K5][K6][K7]
    <
        T,
        K1 extends keyof T,
        K2 extends keyof T[K1],
        K3 extends keyof T[K1][K2],
        K4 extends keyof T[K1][K2][K3],
        K5 extends keyof T[K1][K2][K3][K4],
        K6 extends keyof T[K1][K2][K3][K4][K5],
        K7 extends keyof T[K1][K2][K3][K4][K5][K6],
        K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7]
    >(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3,
        key4: K4,
        key5: K5,
        key6: K6,
        key7: K7,
        key8: K8,
    ): T[K1][K2][K3][K4][K5][K6][K7][K8]
    <
        T,
        K1 extends keyof T,
        K2 extends keyof T[K1],
        K3 extends keyof T[K1][K2],
        K4 extends keyof T[K1][K2][K3],
        K5 extends keyof T[K1][K2][K3][K4],
        K6 extends keyof T[K1][K2][K3][K4][K5],
        K7 extends keyof T[K1][K2][K3][K4][K5][K6],
        K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
        K9 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8]
    >(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3,
        key4: K4,
        key5: K5,
        key6: K6,
        key7: K7,
        key8: K8,
        key9: K9,
    ): T[K1][K2][K3][K4][K5][K6][K7][K8][K9]
    <
        T,
        K1 extends keyof T,
        K2 extends keyof T[K1],
        K3 extends keyof T[K1][K2],
        K4 extends keyof T[K1][K2][K3],
        K5 extends keyof T[K1][K2][K3][K4],
        K6 extends keyof T[K1][K2][K3][K4][K5],
        K7 extends keyof T[K1][K2][K3][K4][K5][K6],
        K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
        K9 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8],
        K10 extends keyof T[K1][K2][K3][K4][K5][K6][K7][K8][K9]
    >(
        object: T,
        key1: K1,
        key2: K2,
        key3: K3,
        key4: K4,
        key5: K5,
        key6: K6,
        key7: K7,
        key8: K8,
        key9: K9,
        key10: K10,
    ): T[K1][K2][K3][K4][K5][K6][K7][K8][K9][K10]
}

export type SelectorType<T extends SelectorFunction | SelectorBasic> = T extends SelectorFunction
    ? ReturnType<ReturnType<T>>
    : ReturnType<T>

type SelectorFunction = (...args) => Function
type SelectorBasic = (...args) => any

export type ApiError = Error | boolean
