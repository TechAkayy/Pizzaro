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
				countPrice: item.count * item.price
			}))
		},
		count() {
			return this.items.length
		},
		subTotal() {
			return this.items.reduce((acc, item) => Number(item.price) + acc, 0)
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
			const existingItem = this.items.find(
				(item) =>
					item.name === newItem.name &&
					item.selectedSize.name === selectedSize.name
			)
			if (existingItem) {
				this.incrementCartItemCount(existingItem)
			} else {
				const item = { ...newItem }
				item.selectedSize = selectedSize

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
		removeFromCart(name) {},
		incrementCartItemCount(existingItem) {
			existingItem.count++
		},
		decrementCartItemCount(item) {},
		placeOrder() {},
		roundPrice(price) {
			return price.toFixed(2)
			// https://www.delftstack.com/howto/javascript/javascript-round-to-2-decimal-places/
			// return +(Math.round(price + 'e+2') + 'e-2')
		}
	}
})
