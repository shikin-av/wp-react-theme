import React from 'react'

export default class CourierForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: null,
            phone: null,
            email: null,
            address: null,
            message: null,
            resMessage: null
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handleMessageChange = this.handleMessageChange.bind(this)
        
    }

    componentDidMount(){
        const { products, price } = this.props
        console.log('КУРЬЕР продукты: ', products)
    }

    componentDidUpdate(){
        const { products } = this.props
        console.log('КУРЬЕР продукты: ', products)
    }

    handleSubmit(e){
        const { price } = this.props
        const { name, phone, email, address, message, resMessage } = this.state
        e.preventDefault()
        
        let products = this.props.products
        for(let i in products){
            delete products[i]['ID']
            delete products[i]['thumbnail']
        }
        let productsArr = []
        for(let i in products){
            productsArr.push(JSON.stringify(products[i]))
        }
        const productsStr = productsArr.join(',')
        console.log('productsArr ', productsArr)
        console.log('productsStr ', productsStr)

        jQuery($ => {
            $.ajax({
                type: 'POST',
                url: ajax.url,
                data: {
                    name,
                    phone,
                    email,
                    address,
                    products: productsArr,
                    price,
                    message,
                    action: 'courier_form_handler'
                },
                success: (data) => {
                    this.setState({ resMessage: data })
                },
                error: (err) => {
                    console.log('AJAX err: ', err)
                }
            })
        })
    }

    handleNameChange(e){
        this.setState({ name: e.target.value })
        console.log(this.state.products)
    }

    handlePhoneChange(e){
        this.setState({ phone: e.target.value })
    }

    handleEmailChange(e){
        this.setState({ email: e.target.value })
    }

    handleAddressChange(e){
        this.setState({ address: e.target.value })
    }

    handleMessageChange(e){
        this.setState({ message: e.target.value })
    }

    render(){
        return (
            <div id='courierForm'>
                {
                    this.state.resMessage ? <p className='resMessage message'>{this.state.resMessage}</p> 
                    :
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <br/>
                        <h5>Заполните форму,<br/>чтобы сделать заказ:</h5>
                        <input
                            type='text'
                            name='name'
                            placeholder='Ваше имя (обязательно)'
                            required
                            onChange={this.handleNameChange}
                        />
                        <br/>
                        <input
                            type='phone'
                            name='phone'
                            placeholder='Ваш телефон (обязательно)'
                            required
                            onChange={this.handlePhoneChange}
                        />
                        <br/>
                        <input
                            type='address'
                            name='address'
                            placeholder='Ваш адрес (обязательно)'
                            required
                            onChange={this.handleAddressChange}
                        />
                        <br/>
                        <input
                            type='email'
                            name='email'
                            placeholder='Ваш email'
                            onChange={this.handleEmailChange}
                        />
                        <br/>
                        <textarea 
                            rows='3'
                            name='message'
                            placeholder='Примечание к заказу'
                            onChange={this.handleMessageChange}
                        ></textarea>
                        <br/>
                        <input
                            type='submit'
                            value='Заказать'
                            className='buy_btn mid_btn'
                        />
                    </form>
                }
            </div>
        )
    }
}

