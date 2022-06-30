import { defineStore } from 'pinia'
import axios from 'axios'

export const createPizzaStore = defineStore({
	id: 'pizzas',
	state: () => ({
		pizzas: [
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
			// 	{
			// 		name: 'Casa Alfredo',
			// 		img: './src/assets/images/pizzas/02.png',
			// 		ingredients:
			// 			'White sauce pizza, Chicken toppings, Mushrooms, Roaster Garlic and Onions',
			// 		size_on_special: 'Family',
			// 		price: '19.00',
			// 		special_price: '17.00'
			// 	}
			return this.pizzas.filter(
				(pizza) => pizza.size_on_special
				// &&
				// this.sizes.find((size) => size.name === pizza.size_on_special)
			)
		}
	},

	actions: {
		getSizes() {
			axios
				.get('http://localhost:4000/sizes')
				.then((response) => {
					this.sizes = response.data
				})
				.catch((error) => {
					console.log(error)
				})
		},
		getPizzas() {
			axios
				.get('http://localhost:4000/pizzas')
				.then((response) => {
					this.pizzas = response.data
					this.updateSpecialPrices()
				})
				.catch((error) => {
					console.log(error)
				})
		},
		updateSpecialPrices() {
			this.pizzas
				.filter((pizza) => pizza.size_on_special)
				.forEach((pizza) => {
					const size = this.sizes.find(
						(size) => size.name === pizza.size_on_special
					)
					pizza.price = size.price
					pizza.special_price = size.special_price
				})
		}
	}
})
