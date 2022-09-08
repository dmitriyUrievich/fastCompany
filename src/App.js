import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import login from './components/layout/login'
import Main from './components/layout/main'
import NavBar from './components/ui/navBar'
import Users from './components/layout/users'
import EditUserPage from './components/page/userEditPage'

const App = () => {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route path='/users/:userId/:edit' component={EditUserPage}/>
        <Route path='/users/:userId?' component={Users}/>
        <Route path='/login/:type?' component={login}/>
        <Route path='/' exact component={Main}/>
        <Redirect to='/'/>
      </Switch>
    </>
  )
}

export default App
