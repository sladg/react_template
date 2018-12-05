import { reducer as formReducer } from 'redux-form'
import createReducer from '../utils/createReducer'
import { Types } from './actions'
import * as actions from './actions'
import { ProjectState } from './types'

export const initialState: ProjectState = {
    formData: {
        loading: false,
        data: null,
        error: null,
    },
}

const project = createReducer(initialState, {
    [Types.FORM_SUBMIT_SUCCESS]: (state: ProjectState, action: ReturnType<typeof actions.submitProjectFormSuccess>): ProjectState => ({
        ...state,
        formData: {
            ...state.formData,
            ...action.payload,
        },
    }),
    [Types.FORM_SUBMIT_FAILUTE]: (state: ProjectState, action: ReturnType<typeof actions.submitProjectFormFailute>): ProjectState => ({
        ...state,
        formData: {
            ...state.formData,
            ...action.payload,
        },
    }),
})

export default {
    project,
    form: formReducer,
}
