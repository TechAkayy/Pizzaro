import { defineStore } from 'pinia'

export const useDrinksStore = defineStore({
	id: 'drinks',
	state: () => ({
		title: 'Drinks Menu',
		description: 'Choose from our plethora of exquisite pizza creations',
		items: []
	}),

	getters: {},

	actions: {}
})
