import {
	createRouter,
	createWebHistory,
	createWebHashHistory
} from 'vue-router'
import Home from '../pages/Home.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/:category?',
			name: 'home',
			props: (route) => ({ category: route.params.category || 'pizzas' }),
			component: Home
		},
		{
			path: '/track',
			name: 'track',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../pages/Track.vue')
		},
		{
			path: '/order',
			name: 'order',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../pages/Order.vue')
		}
	]
})

export default router
