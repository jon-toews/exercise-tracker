const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  }
}


const auth = {
  authenticateUser(token) {
    localStorage.setItem('token', token);
  },
  isUserAuthenticated() {
    return localStorage.getItem('token') != null;
  },
  deauthenticateUser() {
    console.log('removing token');
    localStorage.removeItem('token');
  },
  getToken() {
    return localStorage.getItem('token');
  }
}

export default auth;