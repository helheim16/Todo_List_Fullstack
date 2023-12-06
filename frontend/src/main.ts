import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "bootswatch/dist/vapor/bootstrap.min.css";

Vue.config.productionTip = false

// Event Bus
export const bus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
