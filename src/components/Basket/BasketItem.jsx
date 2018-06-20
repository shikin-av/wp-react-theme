import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import Buy from '../Product/Buy.jsx'

class BasketItem extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const { product } = this.props
        return (
            <div className='row'>
                <div className='col-md-3 col-6'>
                    <Link to={'/product/' + product.ID}>
                        <img src={product.thumbnail} className='basket_thumbnail' />
                    </Link>
                </div>
                <div className='col-md-4 col-6'>
                    <Link to={'/product/' + product.ID}>
                        <p className='basket_name'>{product.name}</p>
                    </Link>
                </div>
                <div className='col-md-2 col-6'>
                    <span className='basket_list_price'>
                        <span className='price'>{product.price}</span>
                        р.
                    </span>
                </div>
                <div className='col-md-3 col-6'>
                    <div className='basket_buys'>
                        <Buy id={product.ID} count={product.count} price={product.price} />
                    </div>
                </div>
            </div>
        )
    }

}

export default BasketItem