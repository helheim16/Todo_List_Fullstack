import Vue from 'vue'
import App from './App.vue'
import router from './router'
//Aca tengo que importar el framework que voy a usar 

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
