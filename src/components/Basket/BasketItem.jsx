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

    render(){
        const { product } = this.props
        const { productInfo } = this.state
        if(productInfo){
            return (
                <tr>
                    <td>
                        <img src={productInfo.thumbnail} className='basket_thumbnail' />
                    </td>
                    <td>
                        <span className='basket_name'>{productInfo.name}</span>
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
        }else{
            return (
                <tr><td>Загрузка информации о продукте...</td></tr>
            )
        }
        
    }

}

export default BasketItem