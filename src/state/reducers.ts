import { reducer as formReducer } from 'redux-form'
import createReducer from '../utils/createReducer'
import { Types } from './actions'
import * as actions from './actions'
import { ReduxState } from './types'

export const initialState: ReduxState = {
    formData: {
        loading: false,
        data: null,
        error: null,
    },
}

const project = createReducer(initialState, {
    [Types.FORM_SUBMIT_SUCCESS]: (state: ReduxState, action: ReturnType<typeof actions.submitProjectFormSuccess>): ReduxState => ({
        ...state,
        formData: {
            ...state.formData,
            ...action.payload,
        },
    }),
    [Types.FORM_SUBMIT_FAILUTE]: (state: ReduxState, action: ReturnType<typeof actions.submitProjectFormFailute>): ReduxState => ({
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
