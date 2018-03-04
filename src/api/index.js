export const fetchProductsByCategory = async(category) => {    
    return fetch('/wp-json/api/v1/products/' + category)
    .then((res) => res.json())
}