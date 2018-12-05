import { createFormAction } from 'redux-form-saga'

export enum Types {
    FORM_SUBMIT = 'project/SIGN_IN_SUCCESS',
    TEMP = 'project/TEMP',
    TEMP_SUCCESS = 'project/TEMP_SUCCESS',
    TEMP_FAILURE = 'project/TEMP_FAILURE',
}

export const submitProjectForm = createFormAction(Types.FORM_SUBMIT)

export function temp() {
    return {
        type: Types.TEMP,
        payload: {},
    }
}
export function tempSuccess() {
    return {
        type: Types.TEMP_SUCCESS,
        payload: {},
    }
}
export function tempFailure(error: Error) {
    return {
        type: Types.TEMP_FAILURE,
        payload: { error },
    }
}
