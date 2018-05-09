import * as types from '../actions/actionTypes'

const initialState = {}

export default (state = initialState, {type, payload}) => {
    switch(type){
        case types.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
            for(let item of payload){
                const key = item.ID
                state[key] = Object.assign(item, state[key])

                /*if(!state[key]['count']){
                    state[key]['count'] = 0
                }*/
            }
            return state

        /*case types.CHANGE_PRODUCT_COUNT_TO_BASKET:
            for(let i in state){
                const key = state[i].ID
                if(key == payload.id){
                    state[key]['count'] = payload.count
                }
            }
            return state*/
            
        default:
            return state
    }
}