import React from 'react'
//import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

import { getPriceToBasket } from '../../selectors'

class BuyButton extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const { 
            price, 
            getPriceToBasket, 
            text
        } = this.props
        return (
            <button className="buy_btn big_btn">
                <span id="basket_price">{ getPriceToBasket ? getPriceToBasket + 'р.' : null }</span>
                &nbsp;<i className="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;
                <span>{text}</span>
            </button>
        )
    }
}

const mapStateToProps = state => ({
    getPriceToBasket: getPriceToBasket(state)
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyButton)