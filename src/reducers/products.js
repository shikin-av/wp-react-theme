import _ from 'lodash'

import * as types from '../actions/actionTypes'

const initialState = {
    products: []
}

export default (state = initialState, {type, payload}) => {
    switch(type){
        case types.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
            return _.union(state, payload)
                        
        default:
            return state
    }
}