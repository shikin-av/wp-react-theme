import React from 'react'
import {Link} from 'react-router-dom'

const SubCategory = (props) => {
    return (
        <nav id='subcategory' className='navbar navbar-expand-lg navbar-light bg-light'>
            <button 
                className='navbar-toggler' 
                type='button' 
                data-toggle='collapse' 
                data-target='#subcategoryNav' 
                aria-controls='subcategoryNav' 
                aria-expanded='false' 
                aria-label='Toggle navigation'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='subcategoryNav'>
                <ul className='navbar-nav'>
                    <li 
                        className='nav-item' 
                        key={0}
                    >
                        <Link className='nav-link' to='/'>Подкатегория</Link>
                    </li>
                    <li 
                        className='nav-item' 
                        key={1}
                    >
                        <Link className='nav-link' to='/'>Подкатегория</Link>
                    </li>
                    <li 
                        className='nav-item' 
                        key={2}
                    >
                        <Link className='nav-link' to='/'>Подкатегория</Link>
                    </li>
                    <li 
                        className='nav-item' 
                        key={3}
                    >
                        <Link className='nav-link' to='/'>Подкатегория</Link>
                    </li>
                    <li 
                        className='nav-item' 
                        key={4}
                    >
                        <Link className='nav-link' to='/'>Подкатегория</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default SubCategory