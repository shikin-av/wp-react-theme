export const getProductsOnCurrentPage = state => {
    const productsOnCurrPage = []
    if(state.productsCurrentPage != 'empty_result'){
        for(let id of state.productsCurrentPage){
            productsOnCurrPage.push(state.products[id])
        }
        return productsOnCurrPage
    }else{
        return 'empty_result'
    }
}

export const getPriceToBasket = state => {
    return state.basketPrice
}

export const getBasket = state => {
    return state.basket
}

export const getProductsOnState = state => {
    return state.products
}