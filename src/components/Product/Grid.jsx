import React from 'react'
import { connect } from 'react-redux'

import Product from './Product.jsx'
import { fetchProductsByCategory } from '../../actions'
import { getProducts } from '../../selectors'

class Grid extends React.Component {
    constructor(props){
        super(props)
        /*this.state = {
            products: null
        }*/
    }
    
    componentDidMount(){
        const { category } = this.props 
        this.props.fetchProductsByCategory(category)  // action
    }

    renderProduct(product, index){      //TODO
        return (
            <div className='col-sm-3 col-md-3 col-lg-3' key={index}>
                <div className='thumbnail'>
                    <img src={product.thumbnail} />
                </div>
            </div>
        )
    }

    render(){
        const {
            category,
            count,
            products
        } = this.props
        console.log(this.props.products)
        if(products.length){
            return(
                <div className='row'>
                    { products.map((product, index) => this.renderProduct(product, index)) }
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