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