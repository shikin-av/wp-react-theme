import * as types from '../actions/actionTypes'

const initialState = []

export default (state = initialState, {type, payload}) => {
  switch(type){
      case types.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
          return payload.map(product => {
            return product.ID
          })

      default:
          return state
  }
}