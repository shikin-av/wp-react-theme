import React from 'react'
import { connect } from 'react-redux'

import Product from './Product.jsx'
import { fetchProductsByCategory } from '../../actions'
import { getProductsOnCurrentPage, getBasket } from '../../selectors'
import Preloader from '../Preloader/Preloader.jsx'
import SubCategories from './SubCategory.jsx'

class Grid extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products: [],
            prevCategory: null
        }
    }
    
    componentDidUpdate(){
        const { category } = this.props
        if(category !== this.state.prevCategory){
            this.props.fetchProductsByCategory(category)
            this.setState({
                prevCategory: category
            })
        }
    }

    render(){
        const {
            category,
            products,
            categoryName,
            basket,
            parentCategory
        } = this.props
        
        if(products == 'empty_result'){
            return(
                <div className='container'>
                    <div className='row title'>
                        <h2>{categoryName}</h2>
                    </div>
                    <div className='message'>
                        Данные товары не выставлены на сайт.<br/> Их наличие Вы можете узнать позвонив нам
                    </div>
                </div>
            )
        }else{
            if(products.length){
                return(
                    <div className='container'>
                        <div className='row title'>
                            <h2>{categoryName}</h2>
                        </div>
                        <div className='row grid'>
                            {
                                products.map((product, index) => {
                                    if(basket[product.ID]){
                                        const basketProduct = basket[product.ID]
                                        product.count = basketProduct.count
                                    }else{
                                        product.count = 0
                                    }
                                    return <Product product={product} key={product.ID} />
                                })
                            }
                        </div>
                    </div>
                )
            }else{
                return (
                    <Preloader />
                )
            }
        }
    }
}

const mapStateToProps = state => ({
    products: getProductsOnCurrentPage(state),
    basket: getBasket(state)
})

const mapDispatchToProps = {
    fetchProductsByCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)