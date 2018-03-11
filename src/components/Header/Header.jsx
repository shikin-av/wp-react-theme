import React from 'react'


import MainMenu from './MainMenu.jsx'
import Logo from './Logo.jsx'

const Header = () => (
    <div>
        <div id='header' className='row'>
            <div className='w30 col-md-4'>
                <p id='head_block_l'>
                    <a id='headTel' href="83412232238">232-238</a><br/>
                    <button className="buy_btn">Заказать звонок</button>
                </p>
            </div>
            <div className='w30 col-md-4'>
                <Logo />
            </div>
            <div className='w30 col-md-4'>
                <p id='head_block_r'>                    
                    <button className="buy_btn">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>                        
                        <span>&nbsp;Оформить</span>
                    </button><br/>
                    <a id='job_clock'>
                        Вс-Чт <span className='b'>10-00</span> до <span className='b'>22-00</span><br/>
                        Пт-Сб <span className='b'>10-00</span> до <span className='b'>23-00</span>
                    </a><br/>
                </p>
            </div>
        </div>
        <MainMenu />
    </div>
)

export default Header