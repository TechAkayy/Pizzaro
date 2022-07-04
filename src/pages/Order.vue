<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'

const orderStore = useOrderStore()
const { valid, count } =
  storeToRefs(orderStore)
const { placeOrder } = orderStore

const form = ref(null)
const submitOrder = () => {
  if (form.value.validate()) {
    placeOrder()
  }
}

</script>
<template>
    <v-container class="pb-0 pl-0 pt-0">
        <v-btn prepend-icon="material-symbols-arrow-back-rounded" variant="text" class="font-weight-bold text-caption text-sm-subtitle-2" to="/">Back to Menu</v-btn>
    </v-container>
    <v-container>
        <p class="font-weight-bold  text-h5 text-md-h3 text-sm-h4" style="font-family: 'Playfair Display', serif !important">
      My Order </p>
    </v-container>
    <v-form ref="form" lazy-validation v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12" md="false" lg="12" xl="5">
                    <EditCart/>
                </v-col>
                <v-col cols="12" md="false" lg="false" xl="7" v-if="count !== 0">
                    <v-row>
                        <v-col cols="12" md="6" lg="false" xl="6">
                            <EditDeliveryInfo/>
                        </v-col>
                        <v-col cols="12" md="6" lg="false" xl="6">
                            <EditPaymentMethod @submit-order="submitOrder"/>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="4">
</v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<style>
</style>
