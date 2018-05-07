import React from 'react'
import {Link} from 'react-router-dom'

import Buy from './Buy.jsx'
import { fetchProductById as fetchProductByIdApi } from '../../api'

class ProductPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            product: null
        }
    }

    componentWillMount(){
        const { id } = this.props.match.params
        try{
            return fetchProductByIdApi(id)
            .then(product => {
                this.setState({
                    product: product
                })
                console.log(this.state.product)
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
    }

    componentWillUpdate(){
        const { id } = this.props.match.params
        try{
            return fetchProductByIdApi(id)
            .then(product => {
                if(this.state.product && id !== this.state.product.ID){
                    this.setState({
                        product: product
                    })
                    console.log('update')
                }
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
    }

    render(){
        const { product } = this.state
        if(product){
            let content = jQuery.parseHTML(product.content)
            return (
                <div className='container'>
                    <div className='row title'>
                        <h1>{product.name}</h1>
                    </div>
                    <div className='row product_info'>
                        <div className='images col-md-6'>
                            {
                                product.images.map((url, index) =>
                                    <img src={url} key={index} />
                                )
                            }
                        </div>
                        <div className='col-md-6'>
                            <div class="product_price">
                                <b>
                                    <span class="price">{product.price}</span>
                                    <span>р</span>
                                </b>
                            </div>
                            <div className="content" ref={(dom) => {
                                jQuery(dom).html('')
                                for(let el of content){
                                    if(el.nodeName == '#text'){
                                        jQuery(dom).append(`<span>${el.data}</span><br>`)
                                    }else{
                                        jQuery(dom).append(`${el.outerHTML}`)
                                    }
                                }
                            }}>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )
        }else{
            return null
        }
    }
}

export default ProductPage