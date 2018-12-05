export const isEmpty = (value: string) => value === undefined || value === null || value === '' || value.length === 0
const join = (rules: any) => (value: any, data: any) =>
    rules.map((rule: any) => rule(value, data)).filter((error: any) => !!error)[0 /* first error */]

export function email(value) {
    // Let's not start a debate on email regex. This is just for an example app!
    if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'formErrors.email'
    }
}

export const required = requiredWithMessage('formErrors.required')

export function requiredWithMessage(messageKey: string) {
    return (value: any) => {
        if (isEmpty(value) || (typeof value === 'string' && value.trim().length < 1)) {
            return messageKey
        }
    }
}

export function createValidator(rules) {
    return (data: any = {}) => {
        const errors = {}
        Object.keys(rules).forEach((key: any) => {
            const rule = join([].concat(rules[key])) // concat enables both functions and arrays of functions
            const error = rule(data[key], data)
            if (error) {
                errors[key] = error
            }
        })
        return errors
    }
}

export function equalPasswords(field: string) {
    return (value: any, data: any) => {
        if (data) {
            if (value !== data[field]) {
                return 'formErrors.equalPasswords'
            }
        }
    }
}

export function isFieldEqual(field, equalTo) {
    return (value: any, data: any) => {
        if (data) {
            if (!isEmpty(data[field]) && String(data[field]) === String(equalTo)) {
                return required(value)
            }
        }
    }
}

export function isFieldNotEqual(field, equalTo) {
    return (value: any, data: any) => {
        if (data) {
            if (!isEmpty(data[field]) && String(data[field]) !== String(equalTo)) {
                return required(value)
            }
        }
    }
}

export function number(value) {
    if (!isEmpty(value) && !Number.isInteger(Number(value))) {
        return 'formErrors.number'
    }
}

export function greaterThan(minimum: number) {
    return (value: any) => {
        const numValue = Number(value)
        if (!Number.isInteger(numValue) || numValue <= minimum) {
            return 'formErrors.greaterThan'
        }
    }
}

export function greaterThanDate(cmpDateName: string, errorText: string) {
    return (value: any, data: any) => {
        if (value === null) {
            return
        }

        const cmpDate = new Date(data[cmpDateName])
        const valueDate = new Date(value)
        if (!isNaN(cmpDate.valueOf()) && (isNaN(valueDate.valueOf()) || valueDate <= cmpDate)) {
            return errorText
        }
    }
}

export function lessThanDate(cmpDateName: string, errorText: string) {
    return (value: any, data: any) => {
        if (value === null) {
            return
        }

        const cmpDate = new Date(data[cmpDateName])
        const valueDate = new Date(value)
        if (!isNaN(cmpDate.valueOf()) && (isNaN(valueDate.valueOf()) || valueDate >= cmpDate)) {
            return errorText
        }
    }
}

export function greaterThanNow(errorText: string) {
    return (value: any, data: any) => {
        if (value === null) {
            return
        }

        const cmpDate = new Date()
        const valueDate = new Date(value)
        if (!isNaN(cmpDate.valueOf()) && (isNaN(valueDate.valueOf()) || valueDate <= cmpDate)) {
            return errorText
        }
    }
}

export function minLength(minimum) {
    return (value: any) => {
        if (!isEmpty(value) && value.length < minimum) {
            return 'Too short password'
        }
    }
}

export function maxLength(maximum) {
    return (value: any) => {
        if (!isEmpty(value) && value.length > maximum) {
            return 'Too long password'
        }
    }
}

export function mapFieldRequired() {
    return (value: any) => {
        if (!value || isEmpty(value['lat'])) {
            const result = {}
            result['name'] = 'formErrors.required'
            return result
        }
    }
}

export function containsUppercase(value) {
    if (!isEmpty(value) && !/(.*[A-Z].*)/.test(value)) {
        return 'formErrors.mustContainUpper'
    }
}

export function containsLowercase(value) {
    if (!isEmpty(value) && !/(.*[a-z].*)/.test(value)) {
        return 'formErrors.mustContainLower'
    }
}

export function containsSpecialCharacted(value) {
    if (!isEmpty(value) && !/(.*[-+_!@#$%^&*.,?].*)/.test(value)) {
        return 'formErrors.mustContainSpecial'
    }
}

export function containsDigit(value) {
    if (!isEmpty(value) && !/(.*\d.*)/.test(value)) {
        return 'formErrors.mustContainDigit'
    }
}
