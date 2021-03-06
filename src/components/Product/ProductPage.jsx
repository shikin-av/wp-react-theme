import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

import Buy from './Buy.jsx'
import { fetchProductById as fetchProductByIdApi } from '../../api'
import { getBasket } from '../../selectors'
import Preloader from '../Preloader/Preloader.jsx'

class ProductPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            product: null,
            count: null
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params
        try{
            return fetchProductByIdApi(id)
            .then(product => {
                this.setState({
                    product: product
                })
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
    }

    componentDidUpdate(){
        const { id } = this.props.match.params

        try{
            return fetchProductByIdApi(id)
            .then(product => {
                if(this.state.product && id !== this.state.product.ID){
                    this.setState({
                        product: product
                    })
                }
            })
        }catch(err){
            console.log(`ERROR ${err.stack}`)
        }
    }

    getCountOnBasket(){
        const { basket } = this.props
        const { id } = this.props.match.params
        if(basket[id]){
            return basket[id].count
        }else{
            return 0
        }
    }

    render(){
        const { product } = this.state
        if(product){
            if(product == 'error'){
                return (
                    <div className="message">
                        Данный товар не выложен на сайт.<br/> Его наличие Вы можете узнать, позвонив нам.
                    </div>
                )
            }else{
                let content = jQuery.parseHTML(product.content)
                return (
                    <div className='container'>
                        <div className='row title'>
                            <h1>{product.name}</h1>
                        </div>
                        <div className='row product_info'>
                            <div className='images col-md-6'>
                                {
                                    product.images ? (product.images.map((url, index) =>
                                        <img src={url} key={index} />
                                    )) : null
                                }
                            </div>
                            <div className='col-md-6'>
                                <div className="product_price">
                                    <b>
                                        <span className="price">{product.price}</span>
                                        <span>р</span>
                                    </b>
                                    <Buy 
                                        id={product.ID}
                                        count={this.getCountOnBasket()}
                                        price={product.price}
                                        basketBtn={true}
                                    />
                                </div>
                                <div className="content" ref={(dom) => {
                                    jQuery(dom).html('')
                                    if(content){
                                        for(let el of content){
                                            if(el.nodeName == '#text'){
                                                jQuery(dom).append(`<span>${el.data}</span><br>`)
                                            }else{
                                                jQuery(dom).append(`${el.outerHTML}`)
                                            }
                                        }
                                    }
                                }}>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }else{
            return (
                <Preloader />
            )
        }
    }
}



//export default ProductPage
const mapStateToProps = state => ({
    basket: getBasket(state)
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)