export const fetchProductsByCategory = async(category) => {
    return fetch('/wp-json/api/v1/products/' + category)
    .then((res) => res.json())
}
/*
export const fetchPageContent = async(page) => {
    return fetch('/wp-json/api/v1/page/' + page)
    .then((res) => res.json())
    .then(items => {
        return items
    })
}
*/
export const fetchProductById = async(id) => {
    return fetch('/wp-json/api/v1/product/' + id)
    .then((res) => res.json())
}