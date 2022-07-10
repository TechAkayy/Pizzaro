<script setup>
import { ref, computed } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'
import { usePizzaStore } from '@/stores/pizzas'

const pizzaStore = usePizzaStore()
pizzaStore.getPizzas()

const orderStore = useOrderStore()
const { count } = storeToRefs(orderStore)

const route = useRoute()
const currentRoute = computed(() => (route && route.name))
const currentMenuCategory = computed(() => route && route.params.category)
const currentNav = computed(() => currentMenuCategory.value || currentRoute.value)

const signedIn = ref(false)
const signIn = () => (signedIn.value = true)
const signOut = () => (signedIn.value = false)


</script>
<style scoped>
@media (min-width:600px) {
  .avatar {
    position: absolute;
    right: 0;
  }
}
</style>
<template>
    <v-app-bar flat style="width: 100%;background: #e8e7e7;" height="64" location="top" model-value tag="header" class="">
        <div class="d-flex justify-center  pt-4" style="width: 100%;">
            <div class="d-flex justify-space-between" style="width: 1272px;">
                <v-tabs :model-value="currentNav" color="error" style="width: 100%;" hide-slider>
                    <v-tab ripple>
                        <v-img src="/src/assets/logo.svg" width="75"></v-img>
                    </v-tab>
                    <v-tab title="Pizzas" class="font-weight-bold text-subtitle-2" value="pizzas" ripple to="/pizzas">
</v-tab>
                    <v-tab title="Sides" class="font-weight-bold text-subtitle-2" value="sides" ripple to="/sides">
</v-tab>
                    <v-tab title="Desserts" class="font-weight-bold text-subtitle-2" value="desserts" ripple to="/desserts">
</v-tab>
                    <v-tab title="Drinks" class="font-weight-bold text-subtitle-2" value="drinks" to="/drinks" ripple>
</v-tab>
                    <v-tab class="font-weight-bold text-subtitle-2" :to="{ name: 'track' }" value="track" ripple>
                        <v-icon icon="material-symbols-search" size="large"></v-icon>
                        Track Delivery
                    </v-tab>
                </v-tabs>
                <div class="align-center d-flex">
                    <v-btn class="bg-grey-darken-3 mb-0 mr-10 pr-1 text-subtitle-2" rounded="lg" to="/order" ripple tag="button" variant="elevated">
                        <div class="align-center d-flex">
                            <v-icon icon="material-symbols-shopping-cart"></v-icon>
                            <span class=" ml-1">$69.00</span>
                            <v-badge color="error" :content="count" inline rounded="lg" class="ml-1"></v-badge>
                        </div>
                    </v-btn>
                    <v-btn class="bg-grey-darken-3 mb-0  text-subtitle-2" rounded="lg" append-icon="material-symbols-arrow-right-alt-rounded" @click="signIn" v-if="!signedIn">Sign In
</v-btn>
                    <a name="anchor" @click="signOut" v-if="signedIn" class=""> <v-avatar image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDkyMnwwfDF8c2VhcmNofDI5fHxwZXJzb258ZW58MHx8fHwxNjQ4NTQxMjc0&ixlib=rb-1.2.1&q=80&w=200" color="grey-darken-3"></v-avatar> </a>
                </div>
            </div>
        </div>
    </v-app-bar>
</template>
