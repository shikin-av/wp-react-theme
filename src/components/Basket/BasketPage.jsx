import React from 'react'
import { connect } from 'react-redux'

import { getBasket, getPriceToBasket } from '../../selectors'
import BuyButton from './BuyButton.jsx'
import BasketItem from './BasketItem.jsx'
import Basket from './Basket.jsx'
//import OrderForm from './OrderForm.jsx'
import YandexForm from './YandexForm.jsx'
import CourierForm from './CourierForm.jsx'

class BasketPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products: {},
            paymentMethod: null
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

    showForms(){
        const { paymentMethod, products } = this.state
        const { getPriceToBasket } = this.props
        console.log('products on state: ', products)
        switch(paymentMethod){
            case 'yandex':
                return (
                    <YandexForm price={getPriceToBasket} products={products} />
                )
                break
            case 'courier':
                return (
                    <CourierForm price={getPriceToBasket} products={products} />
                )
                break
            default:
                return (
                    <div id='order_form'>
                        <br/>
                        <h5>Выберите способ оплаты:</h5>
                        <button 
                            className="buy_btn mid_btn"
                            onClick={() => {
                                this.setState({ paymentMethod: 'yandex' })
                            }}
                        >Онлайн оплата</button>
                        <br/>
                        <button 
                            className="buy_btn mid_btn"
                            onClick={() => {
                                this.setState({ paymentMethod: 'courier' })
                            }}
                        >Оплата наличными<br/> курьеру</button>
                    </div>
                )
        }
    }
    
    render(){
        const { products } = this.state
        const { getPriceToBasket } = this.props
        if(getPriceToBasket){
            return (
                <div className='container'>
                    <div className='row title'>
                        <h1>Оформить заказ</h1>
                        <strong className='price'>{ getPriceToBasket ? `Сумма: ${getPriceToBasket}р.` : null }</strong>
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
                            { this.showForms() }
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className='row title'>
                    <h1>Ваша корзина пуста</h1>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    basket: getBasket(state),
    getPriceToBasket: getPriceToBasket(state)
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketPage)