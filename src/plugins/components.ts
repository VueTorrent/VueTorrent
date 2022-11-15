import Vue from 'vue'

// register modals
const components = import.meta.glob('./components/Modals/**/*.vue')
Object.entries(components).forEach(([path, definition]) => {
  const componentName = path
    ?.split('/')
    ?.pop()
    ?.replace(/\.\w+$/, '')
  
  if(componentName)  Vue.component(componentName, definition)
})
