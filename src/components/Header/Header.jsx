import React from 'react'
import {Link} from 'react-router-dom'

import MainMenu from './MainMenu.jsx'
import Logo from './Logo.jsx'
import Basket from '../Basket/Basket.jsx'


const Header = () => (
    <div>
        <div id='header'>
            <div className="container">
                <div className='w30 col-md-4'>
                    <p id='head_block_l'>
                        <a id='headTel' href="83412232238">232-238</a><br/>
                        <button className="buy_btn big_text">Заказать звонок</button>
                        <br/><br/>
                    </p>
                </div>
                <div className='w30 col-md-4'>
                    <Logo />
                </div>
                <div className='w30 col-md-4'>
                    <p id='head_block_r'>
                        <Basket key={Math.random()} />
                        <br/>
                        <a id='job_clock'>
                            Вс-Чт <span className='b'>10-00</span> до <span className='b'>22-00</span><br/>
                            Пт-Сб <span className='b'>10-00</span> до <span className='b'>23-00</span>
                        </a><br/>
                        <Link to='/basket'>
                            <img src="/wp-content/uploads/2018/05/payment.png" className='payment_img' />
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        <MainMenu />
    </div>
)

export default Header