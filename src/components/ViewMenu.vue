<script setup>
	import { ref, watch, computed } from 'vue'
	import { usePizzaStore } from '@/stores/pizzas'
	import { useSidesStore } from '@/stores/sides'
	import { useDessertsStore } from '@/stores/desserts'
	import { useDrinksStore } from '@/stores/drinks'
	import { storeToRefs } from 'pinia'

	const props = defineProps({
		category: {
			type: String
			// required: true
		}
	})

	const pizzaStore = usePizzaStore()
	const sidesStore = useSidesStore()
	const dessertsStore = useDessertsStore()
	const drinksStore = useDrinksStore()

	const { title, description, items } = storeToRefs(pizzaStore)
</script>
<template>
	<div class="mt-3 mt-md-4">
		<v-row class="">
			<v-col>
				<p
					class="font-weight-bold mt-1 mt-md-3 mt-sm-2 text-h5 text-md-h3 text-sm-h4"
					style="font-family: 'Playfair Display', serif !important"
				>
					{{ category === 'pizzas' ? title : 'Coming Soon' }}
				</p>
				<p class="mt-2 text-caption text-md-caption" style="max-width: 600px">
					{{ category === 'pizzas' ? description : '' }}
				</p>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-row>
					<v-col
						v-for="(item, index) in items"
						:key="index"
						class="justify-center"
					>
						<PizzaMenuCard :pizza="item" v-if="category === 'pizzas'" />
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="4" class="d-lg-block d-none">
				<EditCart />
			</v-col>
		</v-row>
	</div>
</template>
<style></style>
