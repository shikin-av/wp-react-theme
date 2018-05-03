import * as types from '../actions/actionTypes'

const initialState = {}

export default (state = initialState, {type, payload}) => {
    let newState = state
    switch(type){
        case types.CHANGE_PRODUCT_COUNT_TO_BASKET:
        newState[payload.id] = {
                count: payload.count,
                price: parseInt(payload.price)
            }
            return newState
    
    default:
        return newState
    }
}