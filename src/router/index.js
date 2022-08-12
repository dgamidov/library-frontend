import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../views/Home.vue'
import CSBooks from '../views/CSBooks.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: { title: 'Главная' }
  },
  {
    path: '/cs-books',
    component: CSBooks,
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
