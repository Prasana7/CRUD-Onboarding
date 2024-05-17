import Vue from 'vue';
import VueRouter from 'vue-router';
import UserLogin from '@/views/UserLogin.vue';
import UserRegister from '@/views/UserRegister.vue';
import HomePage from '@/views/HomePage.vue';

Vue.use(VueRouter);


const routes = [
    {
      path: '/home',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/register',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/login',
      name: 'UserLogin',
      component: UserLogin
    },
    // Add other routes here if needed
  ];

const router = new VueRouter({
  mode: 'history',
  routes,
});


export default router;
