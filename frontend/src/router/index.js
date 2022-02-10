import { createRouter, createWebHistory } from 'vue-router'
import Feed from '@/views/Feed.vue';
import Login from '@/views/Login.vue';
import Notfound from '@/views/Notfound.vue';


const routes = [
  {
    name: 'Feed',
    path: '/feed',
    component: Feed,
    meta: {
      title: 'Feed'
    }
  }, {
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      title: 'Groupomania'
    }
  }, {
    name: 'NotFound',
    path: '/:pathMatch(.*)',
    component: Notfound,
    meta: {
      title: '404 not Found'
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
