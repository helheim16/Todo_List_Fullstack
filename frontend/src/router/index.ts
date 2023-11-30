import Vue from 'vue'
import VueRouter, { NavigationGuard, RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '../../firebaseconfig'
// import Login from '../components/logRes.vue';
import Lista from "../views/listaCrud.vue";
import { getAuth } from 'firebase/auth';


Vue.use(VueRouter);


// // guarda la navegacion para verficar la autentificacioón 
// const requireAuth: NavigationGuard = function (to, from,next){
//   const isAuthenticated = auth.currentUser; 
//   if(isAuthenticated){
//     // si el usaurio esta autentidaco, permite el acceso a la ruta 
//     next();
//   }
//   else{
//     // si el usuario no esta autentificado, redirige a la pagina de inicar sesion 
//     next('/');
//   }
// };

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    component: HomeView
  },
  {
    path: '/lista',
    name: 'lista',
    meta: { requireAuth: true },
    component: Lista
  }
]

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

export default router