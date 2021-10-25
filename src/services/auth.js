import store from '../store'

export function isAuthenticated() {
  if (store.state.webuiSettings.disableAuthentication && store.state.authenticated) {
    return true
  }

  return store.state.authenticated
}
