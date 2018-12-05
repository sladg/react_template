import './stylesheets/css/global.css'
import 'antd/dist/antd.min.css'
import 'sanitize.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './state/configureStore'
import { IHotModule } from './typings'
import Homepage from './view/routes/Homepage'
import DefaultTemplate from './view/templates/DefaultTemplate'

declare const module: IHotModule

const store = configureStore()

if (module.hot) module.hot.accept()

ReactDOM.render(
    <Provider store={store}>
        <DefaultTemplate>
            <Homepage />
        </DefaultTemplate>
    </Provider>,
    document.getElementById('root'),
)
