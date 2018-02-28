import React from 'react'
import {Link} from 'react-router-dom'

const Logo = () => {
    const logoUrl = window.global.logoUrl
    if(logoUrl){
        return (
            <Link to='/'>
                <img src={logoUrl} id='logo' />
            </Link>
        )
    }else{
        return null
    }
}

export default Logo