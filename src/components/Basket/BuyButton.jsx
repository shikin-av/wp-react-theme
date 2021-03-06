import React from 'react'
import {Link} from 'react-router-dom'

const BuyButton = (props) => (
   <Link to='/basket'>
        <button className="buy_btn big_text">
            <span id="basket_price">{props.price}{props.price ? <br/> : null}</span>
            &nbsp;<i className="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;
            <span>Оформить</span>
        </button>
    </Link>
)

export default BuyButton