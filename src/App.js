import React from 'react'
import {  Router, Route, Switch } from 'react-router-dom'
import Login from '@/pages/Login/Login.jsx'
import Layout from '@/pages/Layout/Layout.jsx'
import NotFound from '@/pages/NotFound/NotFound.jsx'
import { history } from './utils/history'

import  PrivateRouter  from './components/privateRouter'
export default function App() {
  return (
      <div className="app">
        <Router history={history}>
        <Switch>
          <Route path="/login" component={Login}></Route>
          {/* <Route path="/abc" component={Abc}></Route>  */}
          {/* render 解决路由守卫的问题   本质上使用render解决访问控制功能*/}
          <PrivateRouter path="/home" component={Layout}></PrivateRouter> 
          {/* 增加一个404 */}
          <Route  component={NotFound}></Route>
        </Switch>
        </Router>
      </div>
  )
}