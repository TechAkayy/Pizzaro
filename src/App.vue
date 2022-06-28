<script setup>
	import { computed } from 'vue'
	import { useRoute } from 'vue-router'

	const route = useRoute()
	const currentRoute = computed(() => route.name)
</script>
<style>
	@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700;900&family=Roboto:wght@100;300;400;500;700;900&display=swap');
</style>
<template>
	<v-app style="background: #e8e7e7">
		<!-- <v-app-bar extension-height="48" height="64" model-value></v-app-bar> -->
		<v-app-bar flat color="transparent" height="64" location="top" tag="header"><div class="d-flex justify-center" style="width: 100%;">
                <v-tabs :model-value="currentRoute" hide-slider color="error">
                    <v-tab title="Track Order" class="d-none d-sm-flex hidden-only text-subtitle-2" prepend-icon="material-symbols-search-rounded" to="/track" value="track" selected-class="v-tab--selected"></v-tab>
                    <v-tab to="/track" value="track" class="d-sm-none text-h6" icon="material-symbols-search-rounded" selected-class="v-tab--selected"></v-tab>
                    <v-tab to="/" value="home" selected-class="v-tab--selected">
                        <v-img src="src/assets/logo.svg" width="75"></v-img>
                    </v-tab>
                    <v-tab class="d-none d-sm-flex hidden-only text-subtitle-2" to="/order" value="order" prepend-icon="noto-pizza" selected-class="v-tab--selected">My Cart
                        <v-chip density="compact" color="error" size="small" variant="flat" rounded tag="span">6</v-chip>
                    </v-tab>
                    <v-tab to="/order" value="order" class="d-sm-none text-subtitle-2" selected-class="v-tab--selected">My Cart
                        <v-chip density="compact" color="error" size="small" variant="flat" class=" rounded" tag="span">6</v-chip>
                    </v-tab>
                </v-tabs>
            </div>
			
		</v-app-bar>
		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>
