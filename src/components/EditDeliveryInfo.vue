<script setup>
  import { ref } from "vue";
	import { storeToRefs } from 'pinia'
	import { useOrderStore } from '@/stores/order'

	const orderStore = useOrderStore()
	const { deliveryInfo } =
		storeToRefs(orderStore)
  
</script>
<template>
    <v-card class="pb-2 pl-2 pr-2 pt-4" style="height: 100%;">
        <v-card-title>Additional Information</v-card-title>
        <v-container>
            <v-row>
                <v-col cols="12"><span class=" text-caption">Delivery Address</span><span class="ml-1 text-caption text-error">*</span>
                    <v-text-field class="" hide-details density="compact" variant="outlined" prepend-inner-icon="fluent-my-location-20-filled"></v-text-field>
                </v-col>
                <v-col cols="12"><span class=" text-caption">Contact Person for Delivery</span><span class="ml-1 text-caption text-error">*</span>
                    <v-text-field class="" hide-details density="compact" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12"><span class=" text-caption">Mobile Number</span><span class="ml-1 text-caption text-error">*</span>
                    <v-text-field class="" hide-details density="compact" variant="outlined" placeholder="+61"></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        <v-card-subtitle class="text-caption">Our delivery staff might contact you to make the delivery easier. Also a tracking code for this delivery will be sent to your mobile number.</v-card-subtitle>
    </v-card>
</template>
<style>
	.title {
		color: green;
		font-weight: bold;
	}
</style>
