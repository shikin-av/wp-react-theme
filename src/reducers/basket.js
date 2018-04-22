import * as types from '../actions/actionTypes'

const initialState = {}

export default (state = initialState, {type, payload}) => {
    switch(type){
        case types.CHANGE_PRODUCT_COUNT_TO_BASKET:
            state[payload.id] = {
                count: payload.count,
                price: parseInt(payload.price)
            }
            return state
    
    default:
        return state
    }
}