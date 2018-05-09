import React from 'react'
import { connect } from 'react-redux'

import { getBasket } from '../../selectors'
import { getBasketFromLocalStorage } from '../../actions'
import BuyButton from './BuyButton.jsx'

class Basket extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            price: 0
        }
    }

    componentWillMount(){
        global.basketUpdate = () => {
            this.forceUpdate()
            this.saveToLocalStorage()
        }
    }

    componentDidMount(){
        let basketLS = JSON.parse(localStorage.getItem('basket'))
        if(basketLS){
            this.props.getBasketFromLocalStorage(basketLS)
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

    saveToLocalStorage(){
        const { basket } = this.props
        localStorage.setItem('basket', JSON.stringify(basket))
    }

    render(){
        return (
            <BuyButton price={this.priceCalc()} />
        )
    }
}

const mapStateToProps = state => ({
    basket: getBasket(state)
})

const mapDispatchToProps = {
    getBasketFromLocalStorage
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)