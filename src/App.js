import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import login from './components/layout/login'
import Main from './components/layout/main'
import NavBar from './components/ui/navBar'
import Users from './components/layout/users'

const App = () => {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route path='/' exact component={Main}/>
        <Route path='/login/:type?' component={login}/>
        <Route path='/users/:userId?' component={Users}/>
        <Redirect to='/'/>
      </Switch>
    </>
  )
}

export default App
