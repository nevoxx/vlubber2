import { useMainStore } from '@/stores/main';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/server',
      name: 'server',
      component: () => import('../views/ServerView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import('../views/LoadingView.vue'),
    },
  ],
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();

  console.log('routerBeforeEach | ' + mainStore.connectionStatus);

  // Check connectionStatus and redirect accordingly
  if (mainStore.connectionStatus === 0 && to.name !== 'login') {
    // If the connectionStatus is 0, redirect to the login page
    next({ name: 'login' });
  } else if (mainStore.connectionStatus === 1 && to.name !== 'loading') {
    // If the connectionStatus is 1, redirect to the loading page
    next({ name: 'loading' });
  } else if (mainStore.connectionStatus === 2 && to.name !== 'server') {
    // If the connectionStatus is 2, redirect to the server page
    next({ name: 'server' });
  } else {
    // If everything is correct, proceed with the navigation
    next();
  }
});

export default router;
