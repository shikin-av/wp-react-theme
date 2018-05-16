import React from 'react'
import { connect } from 'react-redux'

import { fetchProductById as fetchProductByIdApi } from '../../api'
import Buy from '../Product/Buy.jsx'

class BasketItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            productInfo: false
        }
    }

    componentDidMount(){
        const { product } = this.props
        try{
            return fetchProductByIdApi(product.ID)
            .then(product => {
                this.setState({
                    productInfo: product
                })
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
    }

    viewProductInfo(product){
        const { productInfo } = this.state
        console.log('INFO ', productInfo)
        return (
            <div>
                <img src={productInfo.thumbnail} className='basket_thumbnail' />
                <span className='price'>{productInfo.name}</span>
                <span className='basket_list_price'>
                    <span className='price'>{product.price}</span>
                    р.
                </span>
                <Buy id={product.ID} count={product.count} price={product.price} />
            </div>
        )
    }

    render(){
        const { product } = this.props
        const { productInfo } = this.state
        return (
            <li>
                {
                    productInfo ? this.viewProductInfo(product) : <div>Закгрузка информации<br/> о продукте...</div>
                }
            </li>
        )
    }

}

export default BasketItem