import React from 'react'
import { connect } from 'react-redux'

import { getPriceToBasket, getBasket } from '../../selectors'

class BuyButton extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            price: 0
        }
    }

    componentWillMount(){
        global.basketUpdate = () => {
            this.forceUpdate()
        }
    }

    componentDidUpdate(){
        if(this.state.price !== this.props.price){
            this.setState({
                price: this.props.price
            })
        }
    }
    
    priceCalc(){
        const { basket } = this.props
        let resultPrice = 0
        for(let i in basket){
            resultPrice += (basket[i]['price'] * basket[i]['count'])
        }
        if(resultPrice){
            return (resultPrice + 'р.')
        }else return null
    }

    render(){
        return (
            <button className="buy_btn">
                <span id="basket_price">{this.priceCalc()}</span>
                &nbsp;<i className="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;
                <span>Оформить</span>
            </button>
        )
    }
}

const mapStateToProps = state => ({
    basket: getBasket(state)
})

const mapDispatchToProps = {    //TODO

}

export default connect(mapStateToProps, mapDispatchToProps)(BuyButton)