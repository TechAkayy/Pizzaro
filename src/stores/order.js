import { defineStore } from 'pinia'
import { usePizzaStore } from '@/stores/pizzas'
import axios from 'axios'

export const useOrderStore = defineStore({
	id: 'order',
	state: () => ({
		items: [],
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
		sizes() {
			return usePizzaStore().sizes
		},
		cartItems() {
			const itemsWithPrices = this.items.map((item) => {
				let price = 0
				let count = 0
				const sizes = item.sizes.map((size) => {
					const countPrice =
						(item.size_on_special && item.size_on_special === size.name
							? size.special_price
							: size.price) * size.count
					price += countPrice
					count += size.count
					return {
						...size,
						countPrice
					}
				})
				return {
					...item,
					sizes,
					price,
					count
				}
			})
			return itemsWithPrices.sort(this.sortArrayOfObjects('name'))
		},
		count() {
			return this.cartItems.reduce((acc, item) => item.count + acc, 0)
		},
		netTotal() {
			return this.cartItems.reduce((acc, item) => Number(item.price) + acc, 0)
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
		addToCart(selectedItem, selectedSize) {
			let item = this.items.find((item) => item.id === selectedItem.id)

			if (!item) {
				const sizesWithCount = this.sizes.map((size) => ({
					...size,
					count: 0
				}))
				item = {
					...selectedItem,
					sizes: sizesWithCount
				}
				this.items.push(item)
			}
			const size = item.sizes.find((size) => size.id === selectedSize.id)
			if (size) {
				this.incrementCartItemCount(size)
			}
		},
		removeFromCart(id) {
			const index = this.items.findIndex((item) => item.id === id)
			if (index > -1) this.items.splice(index, 1)
		},
		incrementCartItemCount(sizeRef) {
			sizeRef.count++
		},
		decrementCartItemCount(sizeRef) {
			if (sizeRef && sizeRef.count !== 0) {
				sizeRef.count++
			}
		},
		clearCart() {
			this.items = []
		},
		placeOrder() {
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
		},
		sortArrayOfObjects(key) {
			// https://stackoverflow.com/a/67992215
			return (a, b) => (a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1)
		}
	}
})
