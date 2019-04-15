import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import VueApexCharts from 'vue-apexcharts';
import store from './services/store';
import './registerServiceWorker'

Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
