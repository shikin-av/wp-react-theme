import React from 'react'

export default class CallMePage extends React.Component {
    constructor(props){
        super(props)
        this.state={
            name: null,
            phone: null,
            resMessage: null
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
    }

    handleSubmit(e){
        const { name, phone } = this.state
        e.preventDefault()
        jQuery($ => {
            $.ajax({
                type: 'POST',
                url: ajax.url,  // defined on functions.php
                data: {
                    name,
                    phone,
                    action: 'callme_handler'
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
    }

    handlePhoneChange(e){
        this.setState({ phone: e.target.value })
    }

    render(){
        return (
            <div className='container'>
                <div className='row title'>
                    <h1>Заказать звонок</h1>
                </div>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <center>
                            { 
                                this.state.resMessage ? <p className='resMessage'>{this.state.resMessage}</p> 
                                :
                                <form
                                    onSubmit={e => this.handleSubmit(e)}
                                >
                                    <p>Запомните форму, и мы свяжемся с Вами в ближайшее время</p>
                                    <input
                                        type='text'
                                        name='name'
                                        placeholder='Ваше имя'
                                        required
                                        onChange={this.handleNameChange}

                                    />
                                    <br/>
                                    <input
                                        type='phone'
                                        name='phone'
                                        placeholder='Ваш телефон'
                                        required
                                        onChange={this.handlePhoneChange}
                                    />
                                    <br/>
                                    <input
                                        type='submit'
                                        value='Заказать звонок'
                                        className='buy_btn mid_btn'
                                    />
                                </form>
                            }
                        </center>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
        )
    }
}