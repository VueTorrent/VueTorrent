import store from '../store'

export function isAuthenticated() {
  if (store.state.webuiSettings.disableAuthentication) {
    return true
  }

  return store.state.authenticated
}
