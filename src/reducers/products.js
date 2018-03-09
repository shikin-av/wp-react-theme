import * as types from '../actions/actionTypes'
import unique from '../utils/unique'

const initialState = {}

export default (state = initialState, {type, payload}) => {
    switch(type){
        case types.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
            console.log(payload)
            return payload      // TODO keep all fetch products on the store (+ fix duplicate) 

            /*console.log(payload[0])
            const resultProducts = {}
            for(item of payload){
                console.log(item)
                const key = item.ID
                resultProducts[key] = item
            }

            return resultProducts
            */
        default:
            return state
    }
}