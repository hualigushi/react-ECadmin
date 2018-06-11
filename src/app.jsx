import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'


import Layout from 'component/layout/index.jsx'

import Home from 'page/home/index.jsx'
import Login from 'page/login/index.jsx'
import UserList from 'page/user/index.jsx'
import ErrorPage from 'page/error/index.jsx'

class App extends React.Component {
    render () {
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/product" component={Home}/>
                    <Route path="/product-category" component={Home}/>
                    <Route path="/user/index" component={UserList}/>
                    <Redirect exact from="/user" to="/user/index"/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        )
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={props => LayoutRouter}/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);