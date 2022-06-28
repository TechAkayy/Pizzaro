<script setup>
	import { computed } from 'vue'
	import { createPizzaStore } from '@/stores/pizzas'
	import { storeToRefs } from 'pinia'

	const pizzaStore = createPizzaStore()
	const { pizzas, sizes } = storeToRefs(pizzaStore)
	const specials = computed(() => pizzaStore.specials)

	pizzaStore.getSizes()
	pizzaStore.getPizzas()
</script>
<style>
	.promo-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 100px auto 100px;
		grid-template-areas: 'free-delivery' 'promos' 'free-fries';
		grid-gap: 10px;
	}
	@media (min-width: 600px) {
		.promo-grid {
			display: grid;
			grid-template-columns: 2fr 1fr;
			grid-template-rows: auto auto;
			grid-template-areas: 'promos free-delivery' 'promos free-fries';
			grid-gap: 10px;
		}
	}
</style>
<template>
	<v-container data-pg-name="Header" class="align-center d-flex flex-column">
		<p class="font-weight-bold mt-1 mt-md-3 mt-sm-2 text-h5 text-md-h3 text-sm-h4" style="font-family: 'Playfair Display', serif !important">
			Famous hand tossed pizza
		</p>
		<p class="mt-2 text-caption text-center text-md-caption" style="max-width: 600px">
			Yes we toss our pizza in mid air it collects all the dirt particles of
			metropolitan pollution that creates a distict flavor of each pizza crust.
		</p>
		<v-container data-pg-name="Promos" class=" mt-2 mt-sm-4 promo-grid">
			<v-container style="grid-area: promos" class="bg-white">
				<v-row>
					<v-col>
						<p class="font-weight-bold text-h6">Rainy day promos</p>
					</v-col>
				</v-row>
				<v-row>
					<v-col v-for="(special, index) in specials" :key="index" class="justify-center"><PromoCard :special="special"/></v-col>
				</v-row>
			</v-container>
			<v-container style="grid-area: free-delivery" class="bg-white">Free Delivery</v-container>
			<v-container style="grid-area: free-fries" class="bg-white">Free Fries</v-container>
		</v-container> </v-container><v-container data-pg-name="Menu"></v-container><v-container data-pg-name="Footer"></v-container>
</template>
