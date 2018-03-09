export const fetchProductsByCategory = async(category) => {
    console.log('fetchProductsByCategory ' + category)
    return fetch('/wp-json/api/v1/products/' + category)
    .then((res) => res.json())
}