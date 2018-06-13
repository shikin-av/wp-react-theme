import React from 'react'
import { connect } from 'react-redux'

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
                    <img src={product.thumbnail} className='basket_thumbnail' />
                </td>
                <td>
                    <span className='basket_name'>{product.name}</span>
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