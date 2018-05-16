import React from 'react'
import { connect } from 'react-redux'

import Product from './Product.jsx'
import { fetchProductsByCategory } from '../../actions'
import { getProductsOnCurrentPage, getBasket } from '../../selectors'

class Grid extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products: [],
            prevCategory: null
        }
    }
    
    componentDidMount(){
        const { category } = this.props 
        this.props.fetchProductsByCategory(category)
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
            basket
        } = this.props
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
            return null
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