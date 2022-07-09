import { defineStore } from 'pinia'
import { usePizzaStore } from '@/stores/pizzas'

export const useMenuStore = defineStore({
	id: 'menu',
	state: () => ({}),
	getters: {
		pizzas() {
			return usePizzaStore().pizzas
		},
		menu() {
			return {
				pizzas: {
					category: 'pizzas',
					title: 'Pizza Menu',
					description: 'Choose from our plethora of exquisite pizza creations',
					items: this.pizzas
				},
				sides: {
					title: 'Sides',
					description: 'Choose from our plethora of exquisite pizza creations',
					items: []
				},
				desserts: {
					title: 'Desserts',
					description: 'Choose from our plethora of exquisite pizza creations',
					items: []
				},
				drinks: {
					title: 'Drinks',
					description: 'Choose from our plethora of exquisite pizza creations',
					items: []
				}
			}
		}
	},
	actions: {}
})
