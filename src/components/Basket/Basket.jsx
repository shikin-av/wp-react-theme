import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import { getBasket } from '../../selectors'
import { getBasketFromLocalStorage, changeBasketPriceToStore } from '../../actions'
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


    
    priceCalc(){
        const { basket, changeBasketPriceToStore } = this.props
        let resultPrice = 0
        for(let i in basket){
            resultPrice += (basket[i]['price'] * basket[i]['count'])
        }
        if(resultPrice){
            changeBasketPriceToStore(resultPrice)
            return (resultPrice + 'р.')
        }else{ 
            changeBasketPriceToStore(null)
            return null
        }
    }

    saveToLocalStorage(){
        const { basket } = this.props
        localStorage.setItem('basket', JSON.stringify(basket))
    }

    render(){
        return (
            <Link to='/basket'>
                <BuyButton 
                    price={this.priceCalc()} 
                    key={Math.random()}
                    text='Оформить'
                />
            </Link>
        )
    }
}

const mapStateToProps = state => ({
    basket: getBasket(state)
})

const mapDispatchToProps = {
    getBasketFromLocalStorage,
    changeBasketPriceToStore
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)