<script setup class="">
	import { computed, ref } from 'vue'
	import { storeToRefs } from 'pinia'
	import { createPizzaStore } from '@/stores/pizzas'
	const pizzaStore = createPizzaStore()
	const { sizes } = storeToRefs(pizzaStore)
	const sizeOptions = computed(() =>
		sizes.value.map((size) => size.description)
	)
	const selectedSize = ref(sizeOptions.value[0])

	const props = defineProps({
		pizza: {
			type: Object,
			required: true
		}
	})
</script>

<style lang="scss">
	//https://vue-select.org/guide/css.html#overriding-default-styles
	.v-select .vs__search::placeholder,
	.v-select .vs__dropdown-toggle,
	.v-select .vs__dropdown-menu {
		/* background: #dfe5fb; */
		/* border: none; */
		color: #394066;
		/* text-transform: lowercase; */
		/* font-variant: small-caps; */
		// @extend .text-red;
		font-size: 14px;
		min-width: 100px;
	}

	.vs__dropdown-menu .vs__dropdown-option {
		font-size: 14px;
	}
</style>

<template>
	<v-card class="pb-3 pt-3" elevation="0" border>
		<v-img width="120px" class="ml-auto mr-auto" :src="pizza.img"></v-img><v-card-title class="justify-center text-subtitle-2">{{
			pizza.name
		}}</v-card-title><v-card-subtitle class="align-start d-flex text-sm-caption" style="min-height: 60px;">{{
			pizza.ingredients
		}}</v-card-subtitle><v-divider class="mb-2 ml-3 mr-3 mt-2"></v-divider>
		<div class="d-flex justify-center">
			<table class="ml-3 mr-3">
				<thead>
					<tr>
						<th class="pl-2 pr-2 text-caption text-center" v-for="(size, index) in sizes" :key="index">
							{{ size.name }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="pl-2 pr-2 text-center text-subtitle-2" v-for="(size, index) in sizes" :key="index">
							<span :class="
									pizza.size_on_special && pizza.size_on_special === size.name
										? 'text-red'
										: ''
								">${{
									pizza.size_on_special && pizza.size_on_special === size.name
										? size.special_price
										: size.price
								}}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<v-divider class="mb-2 ml-3 mr-3 mt-2"></v-divider>

		<v-card-actions class="justify-center mt-n2">
			<!-- <v-select
				:items="sizes"
				class="ml-2 text-caption"
				item-title="description"
				item-value="name"
				v-model="selectedSize"
				variant="outlined"
			></v-select> -->
			<div class="align-center d-flex flex-nowrap mt-2">
				<div class="ml-2">
					<vue-select v-model="selectedSize" :options="sizes" label="description" :value="sizes[0]" append-to-body :clearable="false" :searchable="false" style="min-width: 150px"></vue-select>
				</div>
				<v-btn class="d-sm-none ml-2 mr-2" icon="mdi-plus-box" color="error" variant="tonal">Add</v-btn>
				<v-btn class="bg-error d-none d-sm-block ml-2" density="compact">Add</v-btn>
			</div>
		</v-card-actions>
	</v-card>
</template>
