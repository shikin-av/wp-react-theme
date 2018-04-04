import React from 'react'
import { connect } from 'react-redux'

import Product from './Product.jsx'
import Buy from './Buy.jsx'
import { fetchProductsByCategory } from '../../actions'
import { getProducts } from '../../selectors'

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
        this.props.fetchProductsByCategory(category)  // action
    }
    componentDidUpdate(){
        const { category } = this.props
        if(category !== this.state.prevCategory){
            this.props.fetchProductsByCategory(category)  // action
            this.setState({
                prevCategory: category
            })
        }
    }

    renderProduct(product, index){      //TODO
        return (
            <div className='col-sm-3 col-md-3 col-lg-3 product' key={index}>
                <div className='product_inner'>
                    <div className='thumbnail'>
                        <img src={product.thumbnail} />
                    </div>
                    <div className='product_name'>
                        {product.name}
                    </div>                    
                    <div className='buy'>
                        <div className='product_price'>
                            <span className='price'>{product.price}</span><span>р</span>
                        </div>
                        <Buy count={product.count} />
                    </div>
                </div>
            </div>
        )
    }

    render(){
        const {
            category,
            products,
            categoryName
        } = this.props
        if(products.length){
            return(
                <div className='container'>
                    <div className='row title'>
                        <h2>{categoryName}</h2>
                    </div>
                    <div className='row grid'>
                        { products.map((product, index) => this.renderProduct(product, index)) }
                    </div>
                </div>
            )
        }else{
            return null
        }
    }
}

const mapStateToProps = state => ({
    products: getProducts(state)
})

const mapDispatchToProps = {
    fetchProductsByCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)