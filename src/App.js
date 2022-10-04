import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import NavBar from './components/ui/navBar'
import Users from './layouts/users'
import login from './layouts/login'
import Main from './layouts/main'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfession'

const App = () => {
  return (
    <>
      <NavBar/>
      <Switch>
        <ProfessionProvider>
          <Route path='/users/:userId?/:edit?' component={Users}/>
          <Route path='/login/:type?' component={login}/>
        </ProfessionProvider>
        <Route path='/' exact component={Main}/>
        <Redirect to='/'/>
      </Switch>
      <ToastContainer/>
    </>
  )
}

export default App
