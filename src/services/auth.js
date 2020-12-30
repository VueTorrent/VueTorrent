import store from '../store'

export function isAuthenticated() {
  return store.state.authenticated
}
