import React from 'react'
import {Link} from 'react-router-dom'

const BuyButton = (props) => (
    <Link to='/basket'>
        <button className="buy_btn">
            <span id="basket_price">{props.price}</span>
            &nbsp;<i className="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;
            <span>Оформить</span>
        </button>
    </Link>

)

export default BuyButton