<script setup>
	import { ref } from 'vue'
	import { storeToRefs } from 'pinia'
	import { usePizzaStore } from '@/stores/pizzas'
	import { useCartStore } from '@/stores/cart'

	const props = defineProps({
		special: {
			type: Object,
			required: true
		}
	})

	const pizzaStore = usePizzaStore()
	const { sizes } = storeToRefs(pizzaStore)
	let selectedSize = ref(
		sizes.value.find((size) => size.name === props.special.size_on_special)
	)

	const cartStore = useCartStore()
	const { addToCart } = cartStore
</script>

<template>
	<v-card class="pb-3 pt-3" elevation="0" border>
		<v-img width="120px" class="ml-auto mr-auto" :src="special.img"></v-img
		><v-card-title class="justify-center text-subtitle-2">{{
			special.name
		}}</v-card-title>
		<v-card-title class="justify-center text-subtitle-2">
			<span class="font-weight-bold mr-2 text-error text-subtitle-1"
				>${{ selectedSize.special_price }}</span
			>
			<span class="font-weight-bold text-caption text-decoration-line-through"
				>${{ special.price }}</span
			>
		</v-card-title>
		<div class="d-flex justify-center">
			<v-card-subtitle>{{ special.size_on_special }}</v-card-subtitle
			><v-btn icon="mdi-plus-box" class="d-block d-sm-none ml-2 text-error"
				>Add</v-btn
			><v-btn
				class="d-none d-sm-block"
				color="error"
				density="compact"
				@click="addToCart(special, selectedSize)"
				>Add</v-btn
			>
		</div>
		<v-col></v-col>
	</v-card>
</template>

<style>
	.title {
		color: green;
		font-weight: bold;
	}
</style>
