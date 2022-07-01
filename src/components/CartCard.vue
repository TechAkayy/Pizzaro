<script setup>
	import { storeToRefs } from 'pinia'
	import { useCartStore } from '@/stores/cart'

	const cartStore = useCartStore()
	const { cartItems, count, deliveryAddress, cartAmounts } =
		storeToRefs(cartStore)
	const {
		removeFromCart,
		incrementCartItemCount,
		decrementCartItemCount,
		placeOrder
	} = cartStore
</script>

<template class="">
	<v-card class="mr-2 pb-2 pl-2 pr-2 pt-4">
		<v-card-title>
			<v-icon icon="noto-pizza" size="x-small"></v-icon>
			<span class="ml-1 text-no-wrap">My Cart</span> </v-card-title
		><v-container>
			<v-text-field
				color="success"
				label="Delivery Address"
				hide-details
				prepend-inner-icon="ic-baseline-my-location"
				density="compact"
				variant="outlined"
				v-model="deliveryAddress"
			></v-text-field> </v-container
		><v-container>
			<v-table>
				<tbody>
					<tr v-for="(item, index) in cartItems" :key="index">
						<td>
							<v-btn
								icon="fluent-delete-20-regular"
								density="compact"
								variant="flat"
								@click="removeFromCart(item.name)"
							></v-btn>
						</td>
						<td>
							<v-img width="35" :src="item.img"></v-img>
						</td>
						<td>
							<div class="text-no-wrap text-subtitle-2">{{ item.name }}</div>
							<div class="text-caption">
								{{ item.selectedSize.description }}
							</div>
						</td>
						<td>
							<v-btn
								icon="icon-park-outline-reduce-one"
								density="compact"
								variant="flat"
								@click="decrementCartItemCount(index)"
							></v-btn>
						</td>
						<td>
							<div>{{ item.count }}</div>
						</td>
						<td>
							<v-btn
								icon="icon-park-outline-add-one"
								density="compact"
								variant="flat"
								@click="incrementCartItemCount(index)"
							></v-btn>
						</td>
						<td>
							<div class="font-weight-bold">${{ item.countPrice }}</div>
						</td>
					</tr>
					<tr class="d-none">
						<td colspan="7" class="pl-0 pr-0"><v-divider></v-divider></td>
					</tr>
					<tr>
						<td colspan="6">
							<div class="text-caption">Subtotal</div>
						</td>
						<td>
							<div class="font-weight-bold">${{ cartAmounts.subTotal }}</div>
						</td>
					</tr>
					<tr>
						<td colspan="6"><div class="text-caption">GST (10%)</div></td>
						<td>
							<div class="font-weight-bold">${{ cartAmounts.gst }}</div>
						</td>
					</tr>
					<tr>
						<td colspan="6">
							<div class="text-caption">
								Delivery Fee (free for orders over $50)
							</div>
						</td>
						<td>
							<div class="font-weight-bold">${{ cartAmounts.deliveryFee }}</div>
						</td>
					</tr>
					<tr class="d-none">
						<td colspan="7" class="pl-0 pr-0">
							<v-divider></v-divider>
						</td>
					</tr>
					<tr>
						<td colspan="6">
							<div class="font-weight-bold text-body-1">Total</div>
						</td>
						<td>
							<div class="font-weight-bold">${{ cartAmounts.total }}</div>
						</td>
					</tr>
					<tr>
						<td colspan="7" class="text-center">
							<v-btn
								width="70%"
								color="error"
								:disabled="!count || !deliveryAddress"
								@click="placeOrder"
								>Place Order</v-btn
							>
						</td>
					</tr>
				</tbody>
			</v-table>
		</v-container>
	</v-card>
</template>

<style>
	.title {
		color: green;
		font-weight: bold;
	}
</style>
