import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Alert } from '../../components'
import auth from '../../utils/Auth'
import storage from '../../utils/Storage'

const SERVER = 'https://blog-app-moscode.herokuapp.com'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, updateError] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  function SubmitForm(e) {
    e.preventDefault()

    axios
      .post(`${SERVER}/login`, { email, password })
      .then(({ data }) => {
        if (data.success) {
          const {
            data: { token }
          } = data
          storage.setToken(token)
          auth.onAuthChange()
          updateError(false)
          setErrMsg('')
          history.push('/app')
        } else {
          updateError(true)
          setErrMsg(data.msg)
        }
      })
      .catch((err) => {
        updateError(true)
        setErrMsg(err.message)
      })
  }
  return (
    <div className="w-full h-screen bg-green-100 flex items-center justify-center">
      {error && <Alert errMsg={errMsg} error={error} />}
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={SubmitForm}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email-address">
              Email address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="******************"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Sign In
            </button>
            <small className="inline-block align-baseline ">
              New user?
              <Link
                to="/register"
                className="font-bold text-sm text-blue-500 hover:text-blue-800 text-xs mx-1"
                href="#">
                Register
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
