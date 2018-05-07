import * as types from '../actions/actionTypes'
//import unique from '../utils/unique'

const initialState = {}

export default (state = initialState, {type, payload}) => {
    const resultProducts = state
    switch(type){
        case types.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
            for(let item of payload){
                const key = item.ID
                resultProducts[key] = Object.assign(item, resultProducts[key])

                /*if(!resultProducts[key]['count']){
                    resultProducts[key]['count'] = 0
                }*/
            }
            return resultProducts

        case types.CHANGE_PRODUCT_COUNT_TO_BASKET:
            for(let i in resultProducts){
                const key = resultProducts[i].ID
                if(key == payload.id){
                    resultProducts[key]['count'] = payload.count
                }
            }
            return resultProducts
            
        default:
            return state
    }
}