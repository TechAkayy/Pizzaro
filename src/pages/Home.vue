<script setup>
	import { computed } from 'vue'
	import { usePizzaStore } from '@/stores/pizzas'
	import { storeToRefs } from 'pinia'

	const pizzaStore = usePizzaStore()
	const { pizzas } = storeToRefs(pizzaStore)
	const specials = computed(() => pizzaStore.specials)
</script>
<style>
	.promo-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto auto auto;
		grid-template-areas: 'free-delivery' 'promos' 'free-fries';
		grid-gap: 10px;
	}
	@media (min-width: 600px) {
		.promo-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: auto auto;
			grid-template-areas: 'free-delivery free-fries' 'promos promos';
			grid-gap: 10px;
		}
	}
	@media (min-width: 960px) {
		.promo-grid {
			display: grid;
			grid-template-columns: 2fr 1fr;
			grid-template-rows: auto auto;
			grid-template-areas: 'promos free-delivery' 'promos free-fries';
			grid-gap: 10px;
		}
	}
	.fries {
		min-width: 80px;
	}
	@media (min-width: 1264px) {
		.fries {
			min-width: 100px;
		}
	}
</style>
<template>
	<v-container data-pg-name="Header">
		<div class="align-center d-flex flex-column justify-center">
			<p
				class="font-weight-bold mt-1 mt-md-3 mt-sm-2 text-center text-h5 text-md-h3 text-sm-h4"
				style="font-family: 'Playfair Display', serif !important"
			>
				Famous hand tossed pizza
			</p>
			<p
				class="mt-2 text-caption text-center text-md-caption"
				style="max-width: 600px"
			>
				Yes we toss our pizza in mid air it collects all the dirt particles of
				metropolitan pollution that creates a distict flavor of each pizza
				crust.
			</p>
		</div>
		<div class="mt-2 mt-sm-4 promo-grid">
			<v-container style="grid-area: promos" class="bg-white">
				<v-row>
					<v-col>
						<p class="font-weight-bold text-h6">Rainy day promos</p>
					</v-col>
				</v-row>
				<v-row>
					<v-col
						v-for="(special, index) in specials"
						:key="index"
						class="justify-center"
						><PromoCard :special="special" data-pg-name="PromoCard"
					/></v-col>
				</v-row> </v-container
			><v-container
				style="grid-area: free-delivery"
				class="align-center bg-white d-flex d-sm-inline flex-column text-center text-sm-left"
				><p class="font-weight-bold text-h6">
					Free delivery for orders over $50
				</p>
				<p class="text-caption">In selected locations</p>
				<div class="mt-2">
					<a class="text-body-2 text-indigo">Learn More</a>
				</div></v-container
			><v-container
				style="grid-area: free-fries"
				class="align-center bg-white d-flex justify-center"
				><div class="fries">
					<v-img src="src/assets/images/free-fries.png" class></v-img>
				</div>
				<div class="align-center d-flex d-sm-block ml-2">
					<p class="font-weight-bold text-h6">Free Fries Friday</p>
					<p class="d-none d-sm-block text-caption">
						Every friday we have free fries for every $20 order
					</p>
				</div>
				<div
					class="align-center bg-light-blue-darken-3 d-flex flex-column justify-center ml-2 pb-1 pl-2 pr-2 pt-1"
					style="max-height: 120px; height: 100%"
				>
					<p class="text-caption text-uppercase">IN</p>
					<p class="font-weight-bold text-h5 text-uppercase">2</p>
					<p class="text-caption text-uppercase">DAYS</p>
				</div></v-container
			>
		</div> </v-container
	><v-container data-pg-name="Menu"
		><v-row class="">
			<v-col>
				<p
					class="font-weight-bold mt-1 mt-md-3 mt-sm-2 text-h5 text-md-h3 text-sm-h4"
					style="font-family: 'Playfair Display', serif !important"
				>
					Pizza Menu
				</p>
				<p class="mt-2 text-caption text-md-caption" style="max-width: 600px">
					Choose from our plethora of exquisite pizza creations
				</p>
			</v-col>
		</v-row>

		<v-row
			><v-col>
				<v-row>
					<v-col
						v-for="(pizza, index) in pizzas"
						:key="index"
						class="justify-center"
					>
						<MenuCard data-pg-name="MenuCard" :pizza="pizza" />
					</v-col>
				</v-row> </v-col
			><v-col cols="auto" xxl="false" class="d-none d-xl-block"
				><CartCard
			/></v-col> </v-row></v-container
	><v-container data-pg-name="Footer"></v-container>
</template>
