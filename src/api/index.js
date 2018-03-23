export const fetchProductsByCategory = async(category) => {
    console.log('FETCHProductsByCategory ' + category)
    return fetch('/wp-json/api/v1/products/' + category)
    .then((res) => res.json())
}