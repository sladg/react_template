import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import { IHotModule, Redux } from '../typings'
import rootReducers from './reducers'

declare const module: IHotModule

const logger = createLogger({
    stateTransformer: (state: Redux) => state,
    diff: true,
    collapsed: true,
})

const sagaMiddleware = createSagaMiddleware({
    onError: (error) => {
        console.error(error)
    },
})

const middlewares = [sagaMiddleware]
middlewares.push(logger)

const configureStore = (initialState: Object = {}) => {
    const store = createStore(combineReducers({ ...rootReducers }), initialState, composeWithDevTools(applyMiddleware(...middlewares)))

    if (module.hot) {
        // Enable webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            return store.replaceReducer(combineReducers({ ...rootReducers }))
        })
    }

    // persistStore(store)

    // store.dispatch(init())

    // rootSagas.map((saga: any) => sagaMiddleware.run(saga, store.dispatch))

    return store
}

export default configureStore
