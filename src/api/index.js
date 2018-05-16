export const fetchProductsByCategory = async(category) => {
    return fetch('/wp-json/api/v1/products/' + category)
    .then(res => res.json())
}

export const fetchPageContent = async(page) => {
    return fetch('/wp-json/api/v1/page/' + page)
    .then(res => res.json())
}

export const fetchProductById = async(id) => {
    return fetch('/wp-json/api/v1/product/' + id)
    .then(res => res.json())
}

export const fetchBlogPosts = async => {
    return fetch('/wp-json/wp/v2/posts')
    .then(res => res.json())
}

export const fetchBlogPageContent = async(id) => {
    return fetch('/wp-json/wp/v2/posts/' + id)
    .then(res => res.json())
}

export const fetchPromotions = async => {
    return fetch('/wp-json/wp/v2/promotions')
    .then((res) => res.json())
}

export const fetchMenu = async => {
    return fetch('/wp-json/api/v1/menu')
    .then((res) => res.json())
}

export const fetchCategoryName = async(category) => {
    return fetch('/wp-json/api/v1/categoryname/' + category)
    .then((res) => res.json())
}

export const fetchSubcategories = async(parentCategory) => {
    return fetch('/wp-json/api/v1/subcategories/' + parentCategory)
    .then((res) => res.json())
}