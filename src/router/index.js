import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'movies',
        component: () => import('../views/page-movies.vue')

    },
    {
        path: '/favorites',
        name: 'favorites',
        component: () => import('../views/page-favorites.vue')

    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;