import React from 'react'
import App from './App'
import Admin from './admin'
import Login from './pages/login'
import LoginForm from './pages/form/login'
import Home from './pages/home'
import Buttons from './pages/ui/buttons'
import noMatch from './components/noMatch'
import Common from './common.js'
import { HashRouter , Route , Switch } from 'react-router-dom'
import BasicTable from './pages/table/basicTable';

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
                        <Route path="/admin/ui/buttons" component={Buttons}></Route>
                        <Route path="/admin/form/login" component={LoginForm}></Route>
                        <Route path="/admin/table/basic" component={BasicTable}></Route>
                        <Route component={noMatch}></Route>
                    </Switch>
                </Admin>
            }></Route>
            <Route path="/common" render={()=>
              <Common>
                  <Switch>
                      <Route path="/common/detail/:orderId" component={Home}></Route>
                  </Switch>
              </Common>
          }></Route>
        </App>
      </HashRouter>
    )
  }
}
