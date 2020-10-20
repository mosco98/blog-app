class Storage {
  constructor() {
    this.authToken = 'AuthToken'
  }

  getToken = () => localStorage.getItem(this.authToken)
  setToken = (token) => localStorage.setItem(this.authToken, token)
}

export default new Storage()
