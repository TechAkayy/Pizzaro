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
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/sides',
			name: 'sides',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../pages/Order.vue')
		},
		{
			path: '/desserts',
			name: 'desserts',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../pages/Order.vue')
		},
		{
			path: '/drinks',
			name: 'drinks',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../pages/Order.vue')
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
