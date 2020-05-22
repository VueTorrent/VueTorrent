import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import store from '@/store'

Vue.use(Router)

const router =  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                public: true,  // Allow access to even if not logged in
                onlyWhenLoggedOut: true
              }
        }
    ]
})


router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public)
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
    const loggedIn =  store.state.authenticated
  
    if (!isPublic && !loggedIn) {
      return next({
        path:'/login',
        query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
      });
    }
  
    // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
      return next('/')
    }
  
    next();
  })

  export default router;