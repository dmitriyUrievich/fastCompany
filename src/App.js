import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import login from './component/layout/login'
import Main from './component/layout/main'
import NavBar from './component/navBar'
import UserList from './component/userList'

const App = () => {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route path='/' exact component={Main}/>
        <Route path='/login' component={login}/>
        <Route path='/users/:userId?' component={UserList}/>
        <Redirect to='/'/>
      </Switch>
    </>
  )
}

export default App
