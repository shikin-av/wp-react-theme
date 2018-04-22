import * as types from './actionTypes'
import { fetchProductsByCategory as fetchProductsByCategoryApi } from '../api'

export const fetchProductsByCategory = (category) => async dispatch => {
    dispatch({ type: types.FETCH_PRODUCTS_BY_CATEGORY_START })

    try {
        const products = await fetchProductsByCategoryApi(category)
        dispatch({ 
            type: types.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,
            payload: products
        })
    } catch(err) {
        dispatch({ 
            type: types.FETCH_PRODUCTS_BY_CATEGORY_FAIL,
            payload: err,
            error: true
        })
    }
}

export const changeProductCountToBasket = (id, count, price) => dispatch => {
    //console.log('ACTION changeProductCountToBasket ', id, count)
    dispatch({
        type: types.CHANGE_PRODUCT_COUNT_TO_BASKET,
        payload: {
            id,
            count,
            price
        }
    })
}