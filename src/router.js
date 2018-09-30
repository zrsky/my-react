import React from 'react'
import App from './App'
import Admin from './admin'
import Login from './pages/login'
import Home from './pages/home'
import Buttons from './pages/ui/buttons'
import noMatch from './components/noMatch'
import { HashRouter , Route , Switch } from 'react-router-dom'

export default class IRouter extends React.Component {
  render () {
    return (
      <HashRouter>
        <App>
            <Route path="/login" component={Login}></Route>
            <Route  path="/admin" render={()=>
                <Admin>
                    <Switch>
                        <Route path="/admin/home" component={Home}></Route>
                        <Route path="/admin/ui/buttons" component={Buttons}></Route>
                        <Route component={noMatch}></Route>
                    </Switch>
                </Admin>
            }></Route>
            <Route path="/order/detail" component={Login}></Route>
        </App>
      </HashRouter>
    )
  }
}
