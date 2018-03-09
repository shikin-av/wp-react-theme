import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createHashHistory'
import { Route } from 'react-router'
import { ConnectedRouter as Router, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import 'babel-polyfill'

import reducers from './reducers'
import Header from './components/Header/Header.jsx'
import Main from './components/Main.jsx'


const history = createHistory()
const historyMiddleware = routerMiddleware(history)

const store = createStore(reducers, composeWithDevTools(applyMiddleware(historyMiddleware, thunk)))

const App = () => (
    <div>
        <Header />
        <Main />
    </div>
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)