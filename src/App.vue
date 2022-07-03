<script setup>
	import { computed } from 'vue'
	import { useRoute } from 'vue-router'
	import { storeToRefs } from 'pinia'
	import { useOrderStore } from '@/stores/order'
	import { usePizzaStore } from '@/stores/pizzas'

	const pizzaStore = usePizzaStore()
	pizzaStore.getPizzas()

	const orderStore = useOrderStore()
	const { count } = storeToRefs(orderStore)

	const route = useRoute()
	const currentRoute = computed(() => route.name)
</script>
<template>
	<v-app style="background: #e8e7e7">
		<!-- <v-app-bar extension-height="48" height="64" model-value></v-app-bar> -->
		<v-app-bar flat color="#e8e7e7"
			><div class="d-flex justify-center" style="width: 100%">
				<v-tabs :model-value="currentRoute" hide-slider color="error">
					<v-tab
						title="Track Order"
						class="d-none d-sm-flex hidden-only text-subtitle-2"
						prepend-icon="material-symbols-search-rounded"
						to="/track"
						value="track"
						selected-class="v-tab--selected"
					></v-tab>
					<v-tab
						to="/track"
						value="track"
						class="d-sm-none text-h6"
						icon="material-symbols-search-rounded"
						selected-class="v-tab--selected"
					></v-tab>
					<v-tab to="/" value="home" selected-class="v-tab--selected">
						<v-img src="src/assets/logo.svg" width="75"></v-img>
					</v-tab>
					<v-tab
						class="d-none d-sm-flex hidden-only text-subtitle-2"
						to="/order"
						value="order"
						prepend-icon="noto-pizza"
						>My Cart

						<v-badge
							color="error"
							inline
							class="ml-n1"
							:content="count"
						></v-badge
					></v-tab>
					<v-tab
						to="/order"
						value="order"
						class="d-sm-none text-subtitle-2"
						selected-class="v-tab--selected"
						>My Cart
						<v-chip
							density="compact"
							color="error"
							size="small"
							variant="flat"
							class="rounded"
							v-if="count"
							>{{ count }}</v-chip
						>
					</v-tab>
				</v-tabs>
			</div>
		</v-app-bar>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>
