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
    console.log('selector getPriceToBasket ', state.basket)
    const basket = state.basket
    let resultPrice = 0
    for(let i in basket){
        //console.log('i ', basket[i])
        resultPrice += (basket[i]['price'] * basket[i]['count'])
    }
    return resultPrice
}