import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './Home.jsx'
import Blog from './Blog/Blog.jsx'
import Category from './Product/Category.jsx'

const Main = () => (
    <div id='main'
        style={{minHeight: window.innerHeight + 'px'}}
    >
        <Switch>
            <Route
                exact path='/' 
                component={Home} />
            <Route 
                path='/bloglist' 
                component={Blog} />
            <Route 
                path='/category/:category' 
                component={Category} />
        </Switch>
    </div>
)
export default Main
