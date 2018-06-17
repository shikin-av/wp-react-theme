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
            <tr>
                <td>
                    <Link to={'/product/' + product.ID}>
                        <img src={product.thumbnail} className='basket_thumbnail' />
                    </Link>
                </td>
                <td>
                    <Link to={'/product/' + product.ID}>
                        <span className='basket_name'>{product.name}</span>
                    </Link>
                </td>
                <td>
                    <span className='basket_list_price'>
                        <span className='price'>{product.price}</span>
                        р.
                    </span>
                </td>
                <td>
                    <div className='basket_buys'>
                        <Buy id={product.ID} count={product.count} price={product.price} />
                    </div>
                </td>
            </tr>
        )
    }

}

export default BasketItem