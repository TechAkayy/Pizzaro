import { defineStore } from 'pinia'

export const useDessertsStore = defineStore({
	id: 'desserts',
	state: () => ({
		title: 'Desserts Menu',
		description: 'Choose from our plethora of exquisite pizza creations',
		items: []
	}),

	getters: {},

	actions: {}
})
