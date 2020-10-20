import jwtDecode from 'jwt-decode'

const validToken = (token) => {
  try {
    jwtDecode(token)
  } catch (error) {
    return false
  }

  return true
}

export default validToken
