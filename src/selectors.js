/*const getProductById = (state, id) => {

}*/

export const getProducts = state => {
    //console.log('getProducts()   ', state.products)
    //console.log('products curr page:   ', state.productsCurrentPage)
    const productsOnCurrPage = []
    for(let id of state.productsCurrentPage){
        productsOnCurrPage.push(state.products[id])
    }
    return productsOnCurrPage
}

export const getPriceToBasket = state => {
    const basket = state.basket
    let resultPrice = 0
    for(let i in basket){
        //console.log('i ', basket[i])
        resultPrice += (basket[i]['price'] * basket[i]['count'])
    }
    console.log('selector getPriceToBasket ', resultPrice)
    return resultPrice
}

export const getBasket = state => {
    return state.basket
}