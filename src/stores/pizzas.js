import { defineStore } from 'pinia'
import axios from 'axios'

export const usePizzaStore = defineStore({
	id: 'pizzas',
	state: () => ({
		title: 'Pizza Menu',
		description: 'Choose from our plethora of exquisite pizza creations',
		items: [
			// {
			// 	name: 'Hawaiian Pizza',
			// 	img: './src/assets/images/pizzas/01.png',
			// 	ingredients:
			// 		'Roasted Pork, Ham, Bell pepper, White Onion, Pineapple, Mozzerala & Tomato base'
			// },
			// 	{
			// 		name: 'Casa Alfredo',
			// 		img: './src/assets/images/pizzas/02.png',
			// 		ingredients:
			// 			'White sauce pizza, Chicken toppings, Mushrooms, Roaster Garlic and Onions',
			// 		size_on_special: 'Family',
			// 		price: '19.00',
			// 		special_price: '17.00'
			// 	}
		],
		sizes: [
			// {
			// 	name: 'Family',
			// 	description: 'Fmly(36in.)',
			// 	price: '19.00',
			// 	special_price: '17.00'
			// }
		]
	}),

	getters: {
		specials() {
			return this.items.filter((pizza) => pizza.size_on_special)
		}
	},

	actions: {
		getPizzas() {
			// axios.get('http://localhost:4000/sizes').then((response) => {
			// 	this.sizes = response.data
			// 	axios
			// 		.get('http://localhost:4000/pizzas')
			// 		.then((response) => {
			// 			this.items = response.data
			// 			// this.updateSpecialPrices()
			// 		})
			// 		.catch((error) => {
			// 			console.log(error)
			// 		})
			// })

			axios
				.get('https://1gurwkpu.directus.app/items/sizes')
				.then((response) => {
					this.sizes = response.data.data
					axios
						.get('https://1gurwkpu.directus.app/items/pizzas')
						.then((response) => {
							this.items = response.data.data
							// this.updateSpecialPrices()
						})
						.catch((error) => {
							console.log(error)
						})
				})
				.catch((error) => {
					console.log(error)
				})
		}
		// updateSpecialPrices() {
		// 	this.items
		// 		.filter((pizza) => pizza.size_on_special)
		// 		.forEach((pizza) => {
		// 			const size = this.sizes.find(
		// 				(size) => size.name === pizza.size_on_special
		// 			)
		// 			pizza.price = size.price
		// 			pizza.special_price = size.special_price
		// 		})
		// }
	}
})
