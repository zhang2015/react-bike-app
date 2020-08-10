import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import Home from '../pages/home';
import Login from '../pages/login';
import Index from '../pages/index';
import My from '../pages/my';
import Setting from '../pages/setting';


export default class RouteConfig extends Component {
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path="/home" component= {Home}/>
          <Route path="/home/index" component= {Index}/>
          <Route path="/home/My" exact component= {My}/>
          <Route path="/setting" exact component= {Setting}/>
          <Route path="/login" component= {Login}/>
          {/* <Route path="/info"  component= {info}/>
          <Route path="/msite" component= {msite}/>
          <Route path="/setuser"  component= {setUser}/>
          <Route path="/shop/:id"  component= {shop}/>
          <Route path="/food/:geohash/:id/:title"  component= {food}/>
          <Route path="/technology"  component= {technology}/> */}
          <Redirect exact from='/home' to='/home/index'/>
          <Route component= {Home}/>
        </Switch>
      </HashRouter>
    )
  }
}