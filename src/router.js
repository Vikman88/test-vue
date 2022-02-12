import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/cart',
      component: () => import('./views/AppCart'),
      name: 'cart',
      meta: { layout: 'cart' },
    },
    {
      path: '/',
      component: () => import('./views/AppMain'),
      name: 'main',
      meta: { layout: 'main' },
    },
  ],
});
