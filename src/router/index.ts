import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Homeview.vue'
import LoginView from '@/views/LoginView.vue'
import CreditoList from '@/views/credito/CreditoList.vue'
import PagoList from '@/views/pago/PagoList.vue'
import RegisterView from '@/views/RegisterView.vue'
import UserList from '@/views/user/UserList.vue'
import UserCredito from '@/views/user/UserCredito.vue'
import { isLogin } from '@/services/authService';
import CreditoPago from '@/views/credito/CreditoPago.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UserList,
      meta: { requiresAuth: true },
    },
    {
      path: '/usuario/:id/creditos',
      name: 'usuarioCreditos',
      component: UserCredito,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/creditos',
      name: 'creditos',
      component: CreditoList,
      meta: { requiresAuth: true },
    },
    {
      path: '/creditos/:id/pagos',
      name: 'creditoPagos',
      component: CreditoPago,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/pagos',
      name: 'pagos',
      component: PagoList,
      meta: { requiresAuth: true },
    },
    
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && isLogin()) {
    next('/')
  } else if (to.meta.requiresAuth && !isLogin()) {
    next('/login')
  } else {
    next()
  }
});

export default router
