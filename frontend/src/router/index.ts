import Vue from 'vue'
import VueRouter, { NavigationGuard, RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {auth} from '../../firebaseconfig'
// import Login from '../components/logRes.vue';
import Lista from "../components/listaCrud.vue";


Vue.use(VueRouter);


// guarda la navegacion para verficar la autentificacioón 
const requireAuth: NavigationGuard = function (to, from,next){
  const isAuthenticated = auth.currentUser; 
  if(isAuthenticated){
    // si el usaurio esta autentidaco, permite el acceso a la ruta 
    next();
  }
  else{
    // si el usuario no esta autentificado, redirige a la pagina de inicar sesion 
    next('/');
  }
}

const routes: Array<RouteConfig> = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')


  },
  {
    path: '/',
    name: 'login',
    component: HomeView
  },
  {
    path: '/lista',
    name: 'lista',
    component: Lista
  }
]

const router = new VueRouter({
  routes
})

export default router
