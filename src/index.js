import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, HashRouter, Route, Switch, Link } from 'react-router-dom'

import Header from './components/Header/Header.jsx'
import Main from './components/Main.jsx'

const App = () => (
    <div>
        <Header />
        <Main />
    </div>
)

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById('root')
)