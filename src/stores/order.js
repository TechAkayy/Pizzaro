import { defineStore } from 'pinia'
import axios from 'axios'

export const useOrderStore = defineStore({
	id: 'order',
	state: () => ({
		items: [
			{
				id: '1cf994aa-4285-4f38-a9e5-8dc7b07b832c',
				date_created: '2022-07-01T13:41:02.318Z',
				name: "Kevin's Favorite",
				img: './src/assets/images/pizzas/04.png',
				ingredients:
					'Tripple Sausage, Italian, Hungarian Sausage, Mushroom, Mozarella & Tomato base',
				size_on_special: 'Regular',
				selectedSize: {
					id: '728d55e1-5408-4b09-a815-b98bf32146af',
					date_created: '2022-07-01T13:00:30.701Z',
					name: 'Regular',
					description: 'Reg(15in.)',
					price: '10.00',
					special_price: '8.00'
				},
				selected_size: 'Regular',
				price: '8.00',
				count: 1
			},
			{
				id: '96d007e3-0b31-4991-a36b-45ecc29140fb',
				date_created: '2022-07-01T13:41:02.385Z',
				name: 'Vegetarian',
				img: './src/assets/images/pizzas/08.png',
				ingredients:
					'Healthy but yummy! Bell pepers, Onion, Mushrooms, Tomatoes, Lettuce, Pinapple, Cucumber, Olives, Mozerella',
				size_on_special: 'Family',
				selectedSize: {
					id: '3a1c342e-0407-4510-983c-85a16b3ca0f7',
					date_created: '2022-07-01T13:00:30.824Z',
					name: 'Family',
					description: 'Fmly(36in.)',
					price: '19.00',
					special_price: '17.00'
				},
				selected_size: 'Family',
				price: '17.00',
				count: 1
			},
			{
				id: 'e28fd16c-84f6-458e-b2d1-929eb2415dc5',
				date_created: '2022-07-01T13:41:02.290Z',
				name: 'Casa Alfredo',
				img: './src/assets/images/pizzas/02.png',
				ingredients:
					'White sauce pizza, Chicken toppings, Mushrooms, Roaster Garlic and Onions',
				size_on_special: 'Family',
				selectedSize: {
					id: '3a1c342e-0407-4510-983c-85a16b3ca0f7',
					date_created: '2022-07-01T13:00:30.824Z',
					name: 'Family',
					description: 'Fmly(36in.)',
					price: '19.00',
					special_price: '17.00'
				},
				selected_size: 'Family',
				price: '17.00',
				count: 1
			}
		],
		discountCode: '',
		status: '', // paid, received, cooking, on_its_way, delivered
		valid: false,
		paymentInfo: {
			method: 'card', // card, cash_on_delivery
			card: {
				endingWith: ''
			}
		},
		deliveryInfo: {
			address: '',
			contact: '',
			mobileNumber: '',
			instructions: '',
			trackingCode: ''
		}
	}),
	getters: {
		cartItems() {
			return this.items.map((item) => ({
				...item,
				countPrice: this.roundPrice(item.count * item.price)
			}))
		},
		count() {
			return this.cartItems.reduce((acc, item) => item.count + acc, 0)
		},
		netTotal() {
			return this.cartItems.reduce(
				(acc, item) => Number(item.countPrice) + acc,
				0
			)
		},
		deliveryFee() {
			return this.netTotal === 0 || this.netTotal > 50 ? 0 : 5
		},
		discount() {
			// 10% discount
			return this.discountCode
				? (this.netTotal + this.deliveryFee) * (10 / 100)
				: 0
		},
		subTotal() {
			return this.netTotal + this.deliveryFee - this.discount
		},
		gst() {
			return (this.subTotal * 10) / 100
		},
		total() {
			return this.subTotal + this.gst
		},
		orderAmounts() {
			return {
				deliveryFee: this.roundPrice(this.deliveryFee),
				discount: this.roundPrice(this.discount),
				subTotal: this.roundPrice(this.subTotal),
				gst: this.roundPrice(this.gst),
				total: this.roundPrice(this.total)
			}
		}
	},
	actions: {
		addToCart(newItem, selectedSize) {
			const existingItem = this.items.find(
				(item) =>
					item.id === newItem.id && item.selectedSize.id === selectedSize.id
			)
			if (existingItem) {
				this.incrementCartItemCount(existingItem.id)
			} else {
				const item = { ...newItem }
				item.selectedSize = selectedSize
				item.selected_size = selectedSize.name

				const itemPrice =
					item.size_on_special &&
					item.size_on_special === item.selectedSize.name
						? item.selectedSize.special_price
						: item.selectedSize.price
				this.items.push({
					...item,
					price: itemPrice,
					count: 1
				})
			}
		},
		clearCart() {
			this.items = []
		},
		removeFromCart(id) {
			const index = this.items.findIndex((item) => item.id === id)
			if (index > -1) this.items.splice(index, 1)
		},
		incrementCartItemCount(id) {
			const item = this.items.find((item) => item.id === id)
			if (item) {
				item.count++
			}
		},
		decrementCartItemCount(id) {
			const item = this.items.find((item) => item.id === id)
			if (item && item.count !== 1) {
				item.count--
			}
		},
		runValidation() {
			if (!this.validate) {
				if (!this.deliveryInfo.valid || !this.paymentInfo.valid) {
					this.validate = true
				}
			}
		},
		placeOrder() {
			// this.runValidation()
			if (this.valid) {
				console.log('Valid')
				this.status = 'paid'
				// axios
				// 	.post(
				// 		'https://1gurwkpu.directus.app/items/order',
				// 		this.cartItems.map((item) => {
				// 			const { selectedSize, id, date_created, ...orderItem } = item
				// 			return orderItem
				// 		})
				// 	)
				// 	.then(() => {
				// 		this.deliveryAddress = ''
				// 		this.items = []
				// 	})
				// 	.catch((error) => {
				// 		console.log(error)
				// 	})
			}

			// axios.post('http://localhost:4000/order', {
			// 	items: this.items,
			// 	deliveryAddress: this.deliveryAddress
			// })
		},
		roundPrice(price) {
			return price.toFixed(2)
			// https://www.delftstack.com/howto/javascript/javascript-round-to-2-decimal-places/
			// return +(Math.round(price + 'e+2') + 'e-2')
		},
		applyDiscountCode(code) {
			this.discountCode = code
		}
	}
})
