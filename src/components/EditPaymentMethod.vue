<script setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'

const orderStore = useOrderStore()
const { paymentInfo, orderAmounts } =
  storeToRefs(orderStore)

const cardDetails = ref({
  cardNumber: '',
  expiry: '',
  cvv: ''
})

const emit = defineEmits(['submit-order'])
const submitOrder = () => emit('submit-order')

const cardNumberRules = [
  v => !!v || 'Card Number is required',
  v => {
    const replaced = v && v.replaceAll(' ', '')
    return !!(replaced && !(isNaN(replaced)) && replaced.length === 16) || 'Invalid Card Number'
  },
]
const cardExpiryRules = [
  v => !!v || 'Card Expiry is required',
  v => {
    const replaced = v && v.replaceAll('/', '')
    return !!(replaced && !(isNaN(replaced)) && replaced.length === 4) || 'Invalid Card Expiry'
  },
]
const cardCvvRules = [
  v => !!v || 'Card CVV is required',
  v => !!(v && !(isNaN(v)) && v.length === 3) || 'Invalid Card CVV',
]

</script>
<template>
    <v-card class="pb-2 pl-2 pr-2 pt-4">
        <v-card-title>Payment Method </v-card-title>
        <v-radio-group class="" v-model="paymentInfo.method" true-icon="ic-outline-radio-button-checked" false-icon="ic-outline-radio-button-unchecked">
            <v-container>
                <v-radio class="" value="card">
                    <template v-slot:label><span class=" text-caption">Credit or Debit
              Card</span>
                    </template>
                </v-radio>
                <v-row class="" v-if="paymentInfo.method === 'card'">
                    <v-col>
                        <v-text-field density="compact" variant="outlined" placeholder="card number" v-model="cardDetails.cardNumber" :rules="cardNumberRules"></v-text-field>
                    </v-col>
                </v-row>
                <v-row v-if="paymentInfo.method === 'card'">
                    <v-col>
                        <v-text-field variant="outlined" density="compact" placeholder="mm/yy" v-model="cardDetails.expiry" :rules="cardExpiryRules"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field density="compact" variant="outlined" placeholder="cvv" v-model="cardDetails.cvv" :rules="cardCvvRules"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-container>
                <v-radio class="" value="cash_on_delivery">
                    <template v-slot:label><span class=" text-caption">Cash on
              Delivery</span>
                    </template>
                </v-radio>
            </v-container>
            <v-container class="d-flex justify-end">
                <v-btn class=" text-capitalize" color="error" size="large" @click="submitOrder">
                    {{ paymentInfo.method === 'card' ? 'Pay $' + orderAmounts.total : 'Place Order' }}
</v-btn>
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
