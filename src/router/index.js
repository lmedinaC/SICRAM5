import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// Importamos la tienda
import store from '../store/modules/login';
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vistaprueba',
    name: 'VistaPrueba',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/VistaPrueba.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/doctorvista',
    name: 'Doctorvista',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Doctorvista.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/organizacionvista',
    name: 'Organizacionvista',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Organizacionvista.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/pacientevista',
    name: 'Pacientevista',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Pacientevista.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/pacientevista/citapaciente',
    name: 'CitaPaciente',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CitaPaciente.vue'),
  },
  {
    path: '/doctorvista/citadoctor',
    name: 'CitaDoctor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CitaDoctor.vue'),
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requireAuth);

  if(rutaProtegida && store.state.user === null){
    next({name: 'Login'})

  }else{
    next()
  }

})


export default router
