import { SubmissionError } from 'redux-form'

export default function createValidationError(apiError: any): SubmissionError<any> {
    const errorFields = {}
    errorFields['_error'] = apiError.message

    if (apiError.invalidAttributes) {
        for (const err of apiError.invalidAttributes) {
            errorFields[err.path] = err.message
        }
    }

    return new SubmissionError(errorFields)
}
