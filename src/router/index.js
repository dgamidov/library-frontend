import { createRouter, createWebHashHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue'
import CSBooksView from '../views/CSBooksView.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: { title: 'Главная' }
  },
  {
    path: '/cs-books',
    component: CSBooksView,
    meta: { title: 'Книги по CS' }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

const DEFAULT_TITLE = 'Default page title';
router.beforeEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
})

export default router
