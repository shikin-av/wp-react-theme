import React from 'react'

const BuyButton = (props) => (
    <button className="buy_btn">
        <span id="basket_price">{props.price}</span>
        &nbsp;<i className="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;
        <span>Оформить</span>
    </button>
)

export default BuyButton