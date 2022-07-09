<script setup>
import { computed } from "vue";
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'


const props = defineProps({
  category: {
    type: String,
    required: true
  }
})

const orderStore = useOrderStore()
const { deliveryOrPickup } = storeToRefs(orderStore)

</script>
<template>
    <v-row class="mt-2 mt-sm-4" v-if="category === 'pizzas'">
        <v-col>
            <v-row class="mt-4 ">
                <v-col class=" pl-md-7">
                    <div class="align-md-start d-flex flex-column text-center text-md-left">
                        <p style="font-family: 'Playfair Display', serif !important;" class="font-weight-bold text-h5 text-lg-h3 text-sm-h4">
            Famous hand tossed pizza </p>
                        <p class="mt-2 text-caption">
            Yes we toss our pizza in mid air it collects all the dirt particles of
            metropolitan pollution that creates a distict flavor of each pizza
            crust. </p>
                    </div>
                </v-col>
                <v-col md="6" sm="12">
                    <div class="align-center d-flex justify-center" style="height: 100%;">
                        <v-btn size="x-large" rounded="lg" color="error" :active="deliveryOrPickup==='delivery'" :prepend-icon="deliveryOrPickup==='delivery' ? 'dashicons-yes': null" @click="deliveryOrPickup='delivery'" width="180" class="font-weight-bold text-button">Delivery</v-btn><span class="font-italic ml-5 mr-5 text-h6" style="font-family: 'Playfair Display', serif !important;">or</span>
                        <v-btn size="x-large" rounded="lg" color="error" :active="deliveryOrPickup==='pickup'" :prepend-icon="deliveryOrPickup==='pickup' ? 'dashicons-yes': null" @click="deliveryOrPickup='pickup'" width="180" class="font-weight-bold text-button">Pickup</v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row class="mt-8">
                <v-col>
                    <ViewPromos/>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    <v-row class="mt-2 mt-sm-4">
        <v-col>
            <ViewMenu :category="category"/>
        </v-col>
    </v-row>
</template>
<style>
</style>