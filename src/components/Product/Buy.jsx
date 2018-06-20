import React from 'react'
import {connect} from 'react-redux'
import device from 'current-device'
import {Link} from 'react-router-dom'

import { changeProductCountToBasket } from '../../actions'

class Buy extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            count: 0    //TODO get count
        }

        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }

    componentWillMount(){
        const { count } = this.props
        this.setState({
            count: count
        })
    }
    
    componentDidUpdate(){
        this.props.changeProductCountToBasket(this.props.id, this.state.count, this.props.price)
        global.basketUpdate()
    }

    increment(){
        let count = this.state.count
        this.setState({
            count: ++count
        })
    }

    decrement(){
        let count = this.state.count
        this.setState({
            count: --count
        })
    }

    renderBtn(){
        return(
            <div className='product_buy_div'>
                <button className='buy_btn' onClick={this.increment}>Заказать</button>
            </div>
        )
    }

    renderCounter(){
        const { count } = this.state
        const needBasketBtn = count && this.props.basketBtn && device.mobile()
        return(
            <div className='product_buy_div' style={needBasketBtn ? {paddingLeft: '38px'} : null}>
                <button className='buy_btn' onClick={this.decrement}>-</button>
                <span className='count'>{count}</span>
                <button className='buy_btn' onClick={this.increment}>+</button>
                { needBasketBtn 
                    ? <Link to='/basket' className='buy_btn product_to_basket_btn'>
                        &nbsp;<i className="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;
                    </Link> 
                    : null 
                }
            </div>
        )
    }

    render(){
        return (
            this.state.count > 0 ? this.renderCounter() : this.renderBtn()
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    changeProductCountToBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Buy)