import React from 'react'
import {Link} from 'react-router-dom'

import Buy from './Buy.jsx'

class Product extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hover: false
        }
    }

    render(){
        const { product } = this.props
        const { hover } = this.state
        return (
            <div className='col-sm-3 col-md-3 col-lg-3 product' >
                <div className='product_inner'>
                    <div className='thumbnail wrapper'
                        onMouseEnter={() => 
                            this.setState({
                                hover: true
                            })
                        }
                        onMouseLeave={() => 
                            this.setState({
                                hover: false
                            })
                        }
                    >
                        <img src={product.thumbnail} />
                        <div className='description'
                            style={{ opacity: hover ? '1' : '0' }}
                        >
                            <p className='description_content'>
                                {product.short_description}
                                <br/>
                                <Link to='/'>
                                    <button className='buy_btn'>Подробнее</button>
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className='product_name'>
                        {product.name}
                    </div>
                    <div className='buy'>
                        <div className='product_price'>
                            <span className='price'>{product.price}</span><span>р</span>
                        </div>
                        <Buy id={product.ID} count={product.count} price={product.price} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Product