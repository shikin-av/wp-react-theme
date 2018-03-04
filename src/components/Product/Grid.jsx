import React from 'react'
import { connect } from 'react-redux'

import Product from './Product.jsx'
import { fetchProductsByCategory } from '../../actions'

class Grid extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products: null
        }
    }
    
    componentDidMount(){
        const { category } = this.props 
        this.props.fetchProductsByCategory(category)  // action
    }

    render(){
        const {
            category,
            count
        } = this.props

        return(
            <div>
                {   //TODO count!
                    0
                }
            </div>
        )
    }
}
/*
const mapStateToProps = state => ({

})
*/
const mapDispatchToProps = {
    fetchProductsByCategory
}

export default connect(null, mapDispatchToProps)(Grid)