import React from 'react'
import { connect } from 'react-redux'

import { changeProductCountToBasket } from '../../actions'
import { getPriceToBasket } from '../../selectors'

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
        //const { basketPrice } = this.props
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
        return(
            <div className='product_buy_div'>
                <button className='buy_btn' onClick={this.decrement}>-</button>
                <span className='count'>{this.state.count}</span>
                <button className='buy_btn' onClick={this.increment}>+</button>
            </div>
        )
    }

    render(){
        return (
            this.state.count > 0 ? this.renderCounter() : this.renderBtn()
        )
    }
}

const mapStateToProps = state => ({     //TODO count
    //basketPrice: getPriceToBasket(state)
})

const mapDispatchToProps = {
    changeProductCountToBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Buy)