/*import React from 'react'
import { connect } from 'react-redux'

//import GetPrice from './GetPrice.jsx'
import { getPriceToBasket } from '../../selectors'

class OrderForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            order: null
        }
    }

    render(){
        const { price } = this.props
        return (
            <div id='order_form'>
                <br/>
                <h5>Выберите способ оплаты:</h5>
                <button className="buy_btn mid_btn">Онлайн оплата</button>
                <br/>
                <button className="buy_btn mid_btn">Оплата наличными<br/> курьеру</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    price: getPriceToBasket(state)
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
*/