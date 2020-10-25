import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'

import { Login, Main, Register } from './pages'
import auth from './utils/Auth'
import ProtectedRoute from './utils/ProtectedRoute'

const App = () => {
  useEffect(() => {
    auth.onAuthChange()
  }, [])

  return (
    <>
      <ProtectedRoute path="/" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </>
  )
}

export default App
