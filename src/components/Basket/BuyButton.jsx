import React from 'react'
import { connect } from 'react-redux'

import { getPriceToBasket } from '../../selectors'

class BuyButton extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            price: 0
        }
    }

    componentDidUpdate(){
        console.log('BuyButton ' + 'this.props.price' + ' = ' + this.props.price)
        console.log('BuyButton ' + 'this.state.price' + ' = ' + this.state.price)
        if(this.state.price !== this.props.price){
            this.setState({
                price: this.props.price
            })
        }
    }

    priceView(){
        if(this.state.price){
            return (this.state.price + 'р.')
        }else{
            return null
        }
    }

    render(){
        return (
            <button className="buy_btn">
                <span id="basket_price">{this.priceView()}</span>
                &nbsp;<i className="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;
                <span>Оформить</span>
            </button>
        )
    }
}

const mapStateToProps = state => ({
    price: getPriceToBasket(state)
})

const mapDispatchToProps = {    //TODO

}

export default connect(mapStateToProps, mapDispatchToProps)(BuyButton)