import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './Auth'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = auth.isAuthenticated()
  return (
    <Route
      exact
      {...rest}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }}
    />
  )
}

export default ProtectedRoute
