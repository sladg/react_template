import { Reducer } from 'redux'
import { INIT } from './actions'

export default (initialState: any, handlers: object): Reducer<any> => {
    if (!initialState) {
        throw new Error('undefined passed to `createReducer` as initial state.')
    }

    if (!handlers) {
        throw new Error('Invalid handlers object passed to `createReducer`')
    }

    return function reducer(state: any = initialState, action) {
        let resultState = state
        if (action.type === INIT) {
            if (initialState.asMutable) {
                resultState = initialState.mergeDeep(state)
            } else {
                resultState = { ...initialState, state }
            }

            return resultState
        }

        if (handlers && handlers.hasOwnProperty(action.type)) {
            const handler = handlers[action.type]
            resultState = handler(state, action)
        }

        return resultState
    }
}
