import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './Home.jsx'
import Blog from './Blog/Blog.jsx'
import Category from './Product/Category.jsx'

const Main = () => (
    <div>
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
