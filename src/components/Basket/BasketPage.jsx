import React from 'react'
import { connect } from 'react-redux'

import { getBasket, getPriceToBasket, getProductsOnState } from '../../selectors'
import { fetchProductById as fetchProductByIdApi } from '../../api'
import BuyButton from './BuyButton.jsx'
import BasketItem from './BasketItem.jsx'
import Basket from './Basket.jsx'
import YandexForm from './YandexForm.jsx'
import CourierForm from './CourierForm.jsx'

class BasketPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products: {},
            paymentMethod: null,
            productsInfo: null
        }
    }

    componentDidUpdate(){
        const { products } = this.state
        const { basket } = this.props
        if(products !== basket){
            this.setState({
                products: basket
            })
        }
        this.getProductsInfo()
    }

    productList(products){
        const productsOnBasket = []
        for(let i in products){
            products[i].ID = parseInt(i)
            productsOnBasket.push(products[i])
        }
        return productsOnBasket
    }

    showForms(){
        const { paymentMethod, products, productsInfo } = this.state
        const { getPriceToBasket } = this.props
                
        const productsToForm = {}
        for(let i in productsInfo){
            productsToForm[i] = Object.assign(products[i], productsInfo[i])
        }

        switch(paymentMethod){
            case 'yandex':
                return (
                    <YandexForm price={getPriceToBasket} products={productsToForm} />
                )
                break
            case 'courier':
                return (
                    <CourierForm price={getPriceToBasket} products={productsToForm} />
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
                                jQuery('.product_buy_div .buy_btn').attr('disabled','disabled')
                            }}
                        >Онлайн оплата</button>
                        <br/>
                        <button 
                            className="buy_btn mid_btn"
                            onClick={() => {
                                this.setState({ paymentMethod: 'courier' })
                                jQuery('.product_buy_div .buy_btn').attr('disabled','disabled')
                            }}
                        >Оплата наличными<br/> курьеру</button>
                    </div>
                )
        }
    }

    getProductsInfo(){
        if(!this.state.productsInfo){
            const products = this.productList(this.state.products)
            let ids = []
            for(let product of products){
                ids.push(product.ID)
            }
            ids = ids.join(',')
            console.log('ids ', ids)
            jQuery($ => {
                $.ajax({
                    type: 'POST',
                    url: ajax.url,
                    data: {
                        ids,
                        action: 'get_several_products'
                    },
                    success: (data) => {
                        const parseData = $.parseJSON(data)
                        const info = {}
                        for(let product of parseData){
                            info[product.ID] = product
                        }
                        this.setState({ productsInfo: info })
                        console.log('AJAX PROD INFO ', this.state.productsInfo)
                    },
                    error: (err) => {
                        console.log('AJAX err: ', err)
                    }
                })
            })
        }
    }
    
    render(){
        const { products, productsInfo } = this.state
        const { getPriceToBasket } = this.props
        
        if(getPriceToBasket){
            if(productsInfo){
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
                                            <BasketItem 
                                                product={Object.assign(product, productsInfo[product.ID])}
                                                key={product.ID || Math.random()} 
                                            />
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
                    <div className='container'>
                    <div className='row'>
                            <div className='col-md-4'></div>
                            <div className='col-md-4'>
                                <center>
                                    <br/>
                                    <br/>
                                    <p className='message'>Информация о товарах загружается</p>
                                </center>
                            </div>
                        </div>
                    </div>
                )
            }
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