import storage from './Storage'
import validToken from './validToken'

function onAuthChange() {
  const token = storage.getToken()
  return validToken(token)
}

class Auth {
  constructor() {
    this.authenticated = false
  }

  onAuthChange() {
    this.authenticated = onAuthChange()
  }

  isAuthenticated() {
    return this.authenticated
  }
}

export default new Auth()
