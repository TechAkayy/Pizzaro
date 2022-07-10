import { defineStore } from 'pinia'

export const useSidesStore = defineStore({
	id: 'sides',
	state: () => ({
		title: 'Sides Menu',
		description: 'Choose from our plethora of exquisite pizza creations',
		items: []
	}),

	getters: {},

	actions: {}
})
