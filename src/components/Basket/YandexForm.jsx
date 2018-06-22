import React from 'react'

class YandexForm extends React.Component {
    constructor(props){
        super(props)
    }

    formHandler(){
        return
    }

    render(){
        const { price, products } = this.props
        const yandexMoneyNumber = window.global.yandexMoneyNumber
        const productsArr = []
        for(let i in products){
            products[i].ID = parseInt(i)
            productsArr.push(products[i])
        }
        return (
            <form id='yandexmoney_form' method='POST' action='https://money.yandex.ru/quickpay/confirm.xml'>
                <br />
                <input type='hidden' name='receiver' onChange={this.formHandler} value={yandexMoneyNumber} />
                <input type='hidden' name='quickpay-form' onChange={this.formHandler} value='shop' />
                <input type='hidden' name='sum' onChange={this.formHandler} value={price} data-type='number' />

                <input type='hidden' name='formcomment' onChange={this.formHandler} value='Суши Ями' />
                <input type='hidden' name='short-dest' id='buy_description' onChange={this.formHandler} value={
                    productsArr.map(product => {
                        return `${product.name}(${product.price}р.) ${product.count}шт. `
                    })
                } />
                <input type='hidden' name='label' onChange={this.formHandler} value='Суши Ями' />
                <input type='hidden' name='targets' onChange={this.formHandler} value='Суши Ями' />
                <input type='hidden' name='comment' onChange={this.formHandler} value={
                    productsArr.map(product => {
                        return `${product.name}(${product.price}р.) ${product.count}шт. `
                    })
                } />
                <input type='hidden' name='need-fio' onChange={this.formHandler} value='true' />
                <input type='hidden' name='need-phone' onChange={this.formHandler} value='true' />
                <input type='hidden' name='need-address' onChange={this.formHandler} value='true' />
                <label><input type='radio' name='paymentType' onChange={this.formHandler} value='AC' checked />Оплата Банковской картой</label><br />
                <label><input type='radio' name='paymentType' onChange={this.formHandler} value='PC' />Оплата Яндекс.Деньгами</label><br />
                <input type='submit' className='buy_btn mid_btn' onChange={this.formHandler} value='Оплатить' />
            </form>
        )
    }
}

export default YandexForm