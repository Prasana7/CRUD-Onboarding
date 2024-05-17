import Vue from 'vue';
import VueRouter from 'vue-router';
import UserLogin from '@/views/UserLogin.vue';
import UserRegister from '@/views/UserRegister.vue';
import HomePage from '@/views/HomePage.vue';
import store from '@/store'; // Import your Vuex store

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }, // Add meta field to indicate authentication requirement
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister,
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
  },
  // Add other routes here if needed
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the route requires authentication
    if (!store.getters.isAuthenticated) {
      // If not authenticated, redirect to the login page
      next({ name: 'UserLogin' });
    } else {
      // If authenticated, proceed to the requested route
      next();
    }
  } else {
    // If the route does not require authentication, proceed to the requested route
    next();
  }
});

export default router;
