import React from 'react'
import { connect } from 'react-redux'

import { getBasket } from '../../selectors'
import BuyButton from './BuyButton.jsx'
import BasketItem from './BasketItem.jsx'
import Basket from './Basket.jsx'

class BasketPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products: {}
        }
    }

    componentDidUpdate(){
        const { basket } = this.props
        if(this.state.products !== basket){
            this.setState({
                products: basket
            })
        }
    }

    productList(products){
        const productsOnBasket = []
        for(let i in products){
            products[i].ID = parseInt(i)
            productsOnBasket.push(products[i])
        }
        console.log('productList = ', productsOnBasket)
        return productsOnBasket
    }
    
    render(){
        const { products, productsIsLoad } = this.state
        return (
            <div className='container'>
                <div className='row title'>
                    <h1>Оформить заказ</h1>
                </div>
                <div className='row'>
                    <div className='images col-md-6'>
                        <table id='basket_list'>
                            <tbody>
                            {
                                this.productList(products).map(product => (
                                    <BasketItem product={product} key={product.ID || Math.random()} />
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className='col-md-6'>
                        {
                            <div id='basket_order_btn'>
                            
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    basket: getBasket(state)
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketPage)