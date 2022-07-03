<script setup>
  import { ref } from "vue";
	import { storeToRefs } from 'pinia'
	import { useOrderStore } from '@/stores/order'

	const orderStore = useOrderStore()
	const { paymentInfo, orderAmounts } =
		storeToRefs(orderStore)

</script>
<template>
    <v-card class="pb-2 pl-2 pr-2 pt-4" style="height: 100%;">
        <v-card-title>Payment Method </v-card-title>
        <v-radio-group class="" v-model="paymentInfo.method" hide-details>
            <v-container>
                <v-radio class="" value="card">
                    <template v-slot:label><span class="font-weight-bold text-black text-body-1">Credit or Debit Card</span>
                    </template>
                </v-radio>
                <v-row class="" v-if="paymentInfo.method === 'card'">
                    <v-col>
                        <v-text-field hide-details density="compact" variant="outlined" placeholder="card number"></v-text-field>
                    </v-col>
                </v-row>
                <v-row v-if="paymentInfo.method === 'card'">
                    <v-col>
                        <v-text-field variant="outlined" hide-details density="compact" placeholder="mm/yy"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field density="compact" hide-details variant="outlined" placeholder="cvv"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-container>
                <v-radio class="" value="cash_on_delivery">
                    <template v-slot:label><span class="font-weight-bold text-black text-body-1">Cash on Delivery</span>
                    </template>
                </v-radio>
            </v-container>
            <v-container class="d-flex justify-end">
                <v-btn class="text-capitalize" color="error" size="large">Pay ${{orderAmounts.total}}</v-btn>
            </v-container>
        </v-radio-group>
    </v-card>
</template>
<style>
	.title {
		color: green;
		font-weight: bold;
	}
</style>
