import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { Main, Login, Register } from './pages'
import ProtectedRoute from './utils/ProtectedRoute'
import auth from './utils/Auth'

const App = () => {
  useEffect(() => {
    auth.onAuthChange()
    console.log(auth.isAuthenticated())
  }, [])

  return (
    <>
      <ProtectedRoute exact path="/app" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </>
  )
}

export default App
