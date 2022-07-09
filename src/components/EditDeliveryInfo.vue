<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'

const orderStore = useOrderStore()
const { customerInfo } =
  storeToRefs(orderStore)

const addressRules = [
  v => !!v || 'Delivery Address is required'
]
const contactRules = [
  v => !!v || 'Contact is required'
]
const mobileNumberRules = [
  v => !!v || 'Mobile Number is required',
  v => {
    const replaced = v && v.replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '')
    return !!(replaced && !(isNaN(replaced)) && replaced.length <= 11) || 'Invalid Mobile Number'
  },
]

</script>
<template>
  <v-card class="pb-2 pl-2 pr-2 pt-4">
    <v-card-title>Additional Information</v-card-title>
    <v-container>
      <v-row>
        <v-col cols="12" class="pb-0"><span class=" text-caption">Delivery Address</span><span
            class="ml-1 text-caption text-error">*</span>
          <v-text-field class="" density="compact" variant="outlined" prepend-inner-icon="fluent-my-location-20-filled"
            :rules="addressRules" v-model="customerInfo.address" clearable></v-text-field>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0"><span class=" text-caption">Contact Person for Delivery</span><span
            class="ml-1 text-caption text-error">*</span>
          <v-text-field class="" density="compact" variant="outlined" :rules="contactRules"
            v-model="customerInfo.contact" clearable></v-text-field>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0"><span class=" text-caption">Mobile Number</span><span
            class="ml-1 text-caption text-error">*</span>
          <v-text-field class="" density="compact" variant="outlined" :rules="mobileNumberRules"
            v-model="customerInfo.mobileNumber" clearable placeholder="+61"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-card-subtitle class="text-caption">Our delivery staff might contact you to make the delivery easier. Also a
      tracking code for this delivery will be sent to your mobile number.
    </v-card-subtitle>
  </v-card>
</template>
<style>
.title {
  color: green;
  font-weight: bold;
}
</style>
