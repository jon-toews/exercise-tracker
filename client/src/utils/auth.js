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