// Importo dependecias que se implemantaran 
import Vue from 'vue';
import VueRouter, { NavigationGuard, RouteConfig } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Lista from "../views/listaCrud.vue";
import { getAuth } from 'firebase/auth';

Vue.use(VueRouter);
// Declaro como van hacer las rutas 
const routes: Array<RouteConfig> = [
  // seccion login y registro
  {
    path: '/',
    name: 'login',
    component: HomeView
  },
  // seccion de lista/crud
  {
    path: '/lista',
    name: 'lista',
    meta: { requireAuth: true },
    component: Lista
    
  }
]
// Declaro rotes
const router = new VueRouter({
  routes
})

// 
router.beforeEach((to, from, next) => {
  // comprueba  si la ruta requiere autorizacion
  if (to.matched.some((record) => record.meta.requireAuth)) {
    // comprueba si existe un usuario logeado
    if (getAuth().currentUser) {
      next();
    } 
    else {
      alert("A donde te pensas que vas ? -_-");
      next('/');
    }
  }
  // si la ruta no requiere autentificacion sigue a la proxima 
  else {
    next();
  }
});

// exporto por defecto la antes declarada router
export default router