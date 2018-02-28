import React from 'react'

import MainMenu from './MainMenu.jsx'
import Logo from './Logo.jsx'

const Header = () => (
    <div>
        <div id='header'>
            <Logo />
        </div>
        <MainMenu />
    </div>
)

export default Header