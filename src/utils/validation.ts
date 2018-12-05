export const isEmpty = (value: string) => value === undefined || value === null || value === '' || value.length === 0
const join = (rules: any) => (value: any, data: any) =>
    rules.map((rule: any) => rule(value, data)).filter((error: any) => !!error)[0 /* first error */]

export const required = requiredWithMessage('This is field is required!')

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
            const rule = join([].concat(rules[key]))
            const error = rule(data[key], data)
            if (error) {
                errors[key] = error
            }
        })
        return errors
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

export const isNumber = (value) => {
    if (!isEmpty(value) && !Number.isInteger(Number(value))) {
        return 'Values must be a number!'
    }
}

export const isText = (value) => {
    if (!isEmpty(value) && value.match(/[0-9]/)) {
        return 'Values must not contain numbers!'
    }
}

export function minLength(minimum) {
    return (value: any) => {
        if (!isEmpty(value) && value.length < minimum) {
            return 'Value is too short!'
        }
    }
}

export function maxLength(maximum) {
    return (value: any) => {
        if (!isEmpty(value) && value.length > maximum) {
            return 'Value is too long!'
        }
    }
}

export function mapFieldRequired() {
    return (value: any) => {
        if (!value || isEmpty(value['lat'])) {
            const result = {}
            result['name'] = 'This field is required!'
            return result
        }
    }
}

export function containsUppercase(value) {
    if (!isEmpty(value) && !/(.*[A-Z].*)/.test(value)) {
        return 'Value must contain upper letter!'
    }
}

export function containsLowercase(value) {
    if (!isEmpty(value) && !/(.*[a-z].*)/.test(value)) {
        return 'Value must contain lower case letter!'
    }
}

export function containsSpecialCharacted(value) {
    if (!isEmpty(value) && !/(.*[-+_!@#$%^&*.,?].*)/.test(value)) {
        return 'Value must contain special character!'
    }
}

export function containsDigit(value) {
    if (!isEmpty(value) && !/(.*\d.*)/.test(value)) {
        return 'Value must contain digit!'
    }
}
