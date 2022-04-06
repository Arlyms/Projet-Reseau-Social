import { createRouter, createWebHistory } from 'vue-router'
import Feed from '@/views/Feed.vue';
import Login from '@/views/Login.vue';

const routes = [
  {
    name: 'Feed',
    path: '/feed',
    component: Feed,
    meta: {
      title: 'Groupomania | Accueil'
    }
  }, { 
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      title: 'Groupomania'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
