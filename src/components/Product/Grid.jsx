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
            <div className='col-sm-4 col-md-4 col-lg-4' key={index}>
                <div className='thumbnail'>
                    <img src={product} />
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

        return(
            <div>
                {   0
                    //products.map((product, index) => this.renderProduct(product, index)) 
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: getProducts(state)
})

const mapDispatchToProps = {
    fetchProductsByCategory
}

export default connect(null, mapDispatchToProps)(Grid)