import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore({
	id: 'cart',
	state: () => ({
		items: [
			// {
			// pizza fields
			// selectedSize
			// count: 1
			// countPrice: 1 x selectedSize.price / special_price
			// }
		],
		deliveryAddress: ''
	}),
	getters: {
		cartItems() {
			return this.items.map((item) => ({
				...item,
				countPrice: this.roundPrice(item.count * item.price)
			}))
		},
		count() {
			return this.cartItems.length
		},
		subTotal() {
			return this.cartItems.reduce(
				(acc, item) => Number(item.countPrice) + acc,
				0
			)
		},
		gst() {
			return (this.subTotal * 10) / 100
		},
		deliveryFee() {
			return this.subTotal > 50 ? 0 : 5
		},
		total() {
			return this.subTotal + this.gst + this.deliveryFee
		},
		cartAmounts() {
			return {
				subTotal: this.roundPrice(this.subTotal),
				gst: this.roundPrice(this.gst),
				deliveryFee: this.roundPrice(this.deliveryFee),
				total: this.roundPrice(this.total)
			}
		}
	},
	actions: {
		addToCart(newItem, selectedSize) {
			const existingItemIndex = this.items.findIndex(
				(item) =>
					item.name === newItem.name &&
					item.selectedSize.name === selectedSize.name
			)
			if (existingItemIndex > -1) {
				this.incrementCartItemCount(existingItemIndex)
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
		removeFromCart(name) {
			const index = this.items.findIndex((item) => item.name === name)
			if (index > -1) this.items.splice(index, 1)
		},
		incrementCartItemCount(index) {
			this.items[index].count++
		},
		decrementCartItemCount(index) {
			if (this.items[index].count !== 1) {
				this.items[index].count--
			}
		},
		placeOrder() {
			// axios.post('http://localhost:4000/cart', {
			// 	items: this.items,
			// 	deliveryAddress: this.deliveryAddress
			// })

			axios
				.post(
					'https://1gurwkpu.directus.app/items/cart',
					this.cartItems.map((item) => {
						const { selectedSize, id, date_created, ...cartItem } = item
						return cartItem
					})
				)
				.then(() => {
					this.deliveryAddress = ''
					this.items = []
				})
				.catch((error) => {
					console.log(error)
				})
		},
		roundPrice(price) {
			return price.toFixed(2)
			// https://www.delftstack.com/howto/javascript/javascript-round-to-2-decimal-places/
			// return +(Math.round(price + 'e+2') + 'e-2')
		}
	}
})
