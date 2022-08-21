import React from 'react'
import { Route, Switch } from 'react-router-dom'
import login from './component/login'
import Main from './component/main'
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
      </Switch>
    </>
  )
}

export default App
