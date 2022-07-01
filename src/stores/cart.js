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
		incrementCartItemCount(existingItem) {
			existingItem.count++
		}
	}
})
