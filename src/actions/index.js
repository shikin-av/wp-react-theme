import * as types from './actionTypes'
import { 
    fetchProductsByCategory as fetchProductsByCategoryApi,
    fetchSeveralProductsByIds as fetchSeveralProductsByIdsApi
} from '../api'

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
    dispatch({
        type: types.CHANGE_PRODUCT_COUNT_TO_BASKET,
        payload: {
            id,
            count,
            price
        }
    })
}

export const getBasketFromLocalStorage = (basketLS) => dispatch => {
    dispatch({
        type: types.GET_BASKET_FROM_LOCAL_STORAGE,
        payload: {
            basketLS
        }
    })
}

export const changeBasketPriceToStore = (price) => dispatch => {
    dispatch({
        type: types.CHANGE_BASKET_PRICE_TO_STORE,
        payload: {
            price
        }
    })
}