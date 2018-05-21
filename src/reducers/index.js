import { combineReducers } from 'redux'
import { routerReduces } from 'react-router-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import products from './products'
import productsCurrentPage from './productsCurrentPage'
import basket from './basket'
import basketPrice from './basketPrice'

export default combineReducers({
    products,
    productsCurrentPage,
    basket,
    basketPrice,
    router: routerReducer
})