import * as types from '../actions/actionTypes'

const initialState = {}

export default (state = initialState, {type, payload}) => {
    switch(type){
        case types.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
            for(let item of payload){
                const key = item.ID
                state[key] = Object.assign(item, state[key])
            }
            return state

        default:
            return state
    }
}