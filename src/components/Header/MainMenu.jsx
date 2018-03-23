import React from 'react'
import {Link} from 'react-router-dom'

export default class MainMenu extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            menu: null,
            current: null
        }
        //this.setState = this.setState.bind(this)
    }

    componentWillMount(){
        if(window.global.menu){
            this.setState({
                menu: window.global.menu
            })
        }else{
            //console.log('MainMenu componentWillMount: Fetch')
            return fetch('/wp-json/api/v1/menu')
            .then((res) => res.json())
            .then(items => {
                this.setState({
                    menu: items
                })
            })
        }
    }

    render(){
        return (
            <nav id='main-menu' className='navbar navbar-expand-lg navbar-light bg-light'>
                <button 
                    className='navbar-toggler' 
                    type='button' 
                    data-toggle='collapse' 
                    data-target='#navbarNav' 
                    aria-controls='navbarNav' 
                    aria-expanded='false' 
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                    {
                        this.state.menu.map(item => (
                            <li 
                                className='nav-item' 
                                key={item.ID}
                            >
                                <Link className='nav-link' to={item.url}>{item.title}</Link>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </nav>
        )
    }
}
/*
<header>
    <nav>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/bloglist'>Blog List</Link></li>
        </ul>
    </nav>
</header>

<li className='nav-item active'>
    <Link className='nav-link' to='/'>Home</Link>
</li>
<li className='nav-item'>
    <Link className='nav-link' to='/bloglist'>Blog List</Link>
</li>
*/