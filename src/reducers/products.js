import * as types from '../actions/actionTypes'
import unique from '../utils/unique'

const initialState = {}

export default (state = initialState, {type, payload}) => {
    switch(type){
        case types.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
            //return payload      // TODO keep all fetch products on the store (+ fix duplicate)
            
            const resultProducts = state
            for(let item of payload){
                const key = item.ID
                resultProducts[key] = item
                if(!resultProducts[key]['count']){
                    resultProducts[key]['count'] = 0
                }
            }
            //console.log('resultProducts: ', resultProducts)
            return resultProducts
            
        default:
            return state
    }
}