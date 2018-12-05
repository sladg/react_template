import { createFormAction } from 'redux-form-saga'
import { ReduxState } from './types'

export enum Types {
    FORM_SUBMIT = 'project/FORM_SUBMIT',
    FORM_SUBMIT_SUCCESS = 'project/FORM_SUBMIT_SUCCESS',
    FORM_SUBMIT_FAILUTE = 'project/FORM_SUBMIT_FAILUTE',
}

export const submitProjectForm = createFormAction(Types.FORM_SUBMIT)

export const submitProjectFormSuccess = (data: ReduxState['formData']['data']) => ({
    type: Types.FORM_SUBMIT_SUCCESS,
    payload: { data },
})
export const submitProjectFormFailute = (error: Error) => ({
    type: Types.FORM_SUBMIT_FAILUTE,
    payload: { error },
})
