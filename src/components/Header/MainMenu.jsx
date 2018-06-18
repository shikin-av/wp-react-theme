import React from 'react'
import {Link} from 'react-router-dom'

import { fetchMenu as fetchMenuApi } from '../../api'

export default class MainMenu extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            menu: null,
            current: null
        }
    }

    componentWillMount(){
        if(window.global.menu){
            this.setState({
                menu: window.global.menu
            })
        }else{
            try{
                return fetchMenuApi()
                .then(items => {
                    this.setState({
                        menu: items
                    })
                })
            }catch(err){
                console.log(`ERROR ${err.stack}`)
            }
        }
    }

    render(){
        return (
            <nav id={this.props.id} className='navbar navbar-expand-lg navbar-light bg-light'>
                <button 
                    className='navbar-toggler' 
                    type='button' 
                    data-toggle='collapse' 
                    data-target='#navbarNav' 
                    aria-controls='navbarNav' 
                    aria-expanded='false' 
                    aria-label='Toggle navigation'
                >
                    <span>МЕНЮ</span>
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