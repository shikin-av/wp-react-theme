import { combineReducers } from 'redux'
import { routerReduces } from 'react-router-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import products from './products'
import productsCurrentPage from './productsCurrentPage'

export default combineReducers({
    products,
    productsCurrentPage,
    router: routerReducer
})