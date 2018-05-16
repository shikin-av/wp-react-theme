import * as types from '../actions/actionTypes'

const initialState = {}

export default (state = initialState, {type, payload}) => {
    switch(type){
        case types.CHANGE_PRODUCT_COUNT_TO_BASKET:
            if(payload.count !== 0){
                state[payload.id] = {
                    count: payload.count,
                    price: parseInt(payload.price)
                }
            }else{
                delete state[payload.id]
            }
            return state
        
        case types.GET_BASKET_FROM_LOCAL_STORAGE:
            return payload.basketLS

    default:
        return state
    }
}