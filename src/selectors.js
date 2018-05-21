export const getProductsOnCurrentPage = state => {
    const productsOnCurrPage = []
    for(let id of state.productsCurrentPage){
        productsOnCurrPage.push(state.products[id])
    }
    return productsOnCurrPage
}

/*export const getPriceToBasket = state => {
    const basket = state.basket
    let resultPrice = 0
    for(let i in basket){
        resultPrice += (basket[i]['price'] * basket[i]['count'])
    }
    return resultPrice
}*/

export const getPriceToBasket = state => {
    return state.basketPrice
}

export const getBasket = state => {
    return state.basket
}

/*export const getProductsOnState = state => {
    return state.products
}*/