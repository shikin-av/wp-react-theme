import React from 'react'
import { connect } from 'react-redux'

import Product from './Product.jsx'
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
        //console.log('category: ', category)
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
                        { products.map((product, index) => <Product product={product} key={product.ID} />) }
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