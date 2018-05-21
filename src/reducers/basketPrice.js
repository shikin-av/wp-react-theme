import * as types from '../actions/actionTypes'

const initialState = null

export default (state = initialState, {type, payload}) => {
    switch(type){
        case types.CHANGE_BASKET_PRICE_TO_STORE:
            return payload.price
    default:
        return state
    }
}