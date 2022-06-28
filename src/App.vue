<script setup>
	import { computed } from 'vue'
	import { useRoute } from 'vue-router'

	const route = useRoute()
	const currentRoute = computed(() => route.name)
</script>
<template>
	<v-app>
		<!-- <v-app-bar extension-height="48" height="64" model-value></v-app-bar> -->
		<v-app-bar height="64" location="top" tag="header" flat>
			<v-tabs style="width: 100%" centered :model-value="currentRoute" hide-slider color="error">
				<v-tab title="Track Order" class="text-subtitle-2" prepend-icon="material-symbols-search-rounded" to="/track" selected-class="v-tab--selected" value="track"></v-tab>
				<v-tab to="/" selected-class="v-tab--selected" value="home">
					<v-img src="src/assets/logo.svg" width="75"></v-img>
				</v-tab>
				<v-tab title="My Cart" class="text-subtitle-2" prepend-icon="noto-pizza" to="/order" selected-class="v-tab--selected" value="order"></v-tab>
			</v-tabs>
		</v-app-bar>
		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>
