import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './Home.jsx'
import Blog from './Blog/Blog.jsx'
import Category from './Product/Category.jsx'
import Page from './Page.jsx'
import ProductPage from './Product/ProductPage.jsx'
import BasketPage from './Basket/BasketPage.jsx'
import CallMePage from './CallMePage.jsx'

class Main extends React.Component {
    constructor(props){
        super(props)
    }

    componentWillUpdate(){
        // scroll to top on switch route
        document.getElementById('header').scrollIntoView(true)
    }

    render(){
        return (
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
                        path='/basket' 
                        component={BasketPage} />
                    <Route 
                        path='/callme' 
                        component={CallMePage} />
                    <Route 
                        path='/category/:category/:subcategory?' 
                        component={Category} />
                    <Route 
                        path='/product/:id' 
                        component={ProductPage} />
                    <Route 
                        path='/:page' 
                        component={Page} />
                </Switch>
            </div>
        )
    }
}
export default Main
