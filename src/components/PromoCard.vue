<script setup class="">
	const props = defineProps({
		special: {
			type: Object,
			required: true
		}
	})
</script>

<template>
	<v-card class=" pb-3 pt-3" elevation="0" border>
		<v-img width="120px" class=" ml-auto mr-auto" :src="special.img"></v-img><v-card-title class="justify-center text-subtitle-2">{{
			special.name
		}}</v-card-title>
		<v-card-title class=" justify-center text-subtitle-2">
			<span class="font-weight-bold mr-2 text-error text-subtitle-1">${{ special.selectedSize.special_price }}</span>
			<span class=" font-weight-bold text-caption text-decoration-line-through">${{ special.selectedSize.price }}</span>
		</v-card-title>
		<div class="d-flex justify-center"><v-card-subtitle>{{special.size_on_special}}</v-card-subtitle><v-btn icon="mdi-plus-box" class="d-block d-sm-none ml-2 text-error">Add</v-btn><v-btn class="d-none d-sm-block " color="error" density="compact">Add</v-btn></div><v-col></v-col>
	</v-card>
</template>

<style>
	.title {
		color: green;
		font-weight: bold;
	}
</style>
