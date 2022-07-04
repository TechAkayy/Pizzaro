<script setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'

const orderStore = useOrderStore()
const { cartItems, orderAmounts, discountCode } =
  storeToRefs(orderStore)
const {
  removeFromCart,
  incrementCartItemCount,
  decrementCartItemCount,
  placeOrder, applyDiscountCode
} = orderStore
let code = ref('')

const applyCode = () => {
  applyDiscountCode(code.value)
  code.value = ''
}

</script>
<template class="">
  <v-card class="pa-2" style="height: 100%;">
    <v-container class="cart-width">
      <v-card-title>
        <v-icon icon="noto-pizza" size="x-small"></v-icon>
        <span class="ml-1 text-no-wrap">My Cart</span>
        <v-spacer></v-spacer>
        <v-text-field hide-details placeholder="Discount Code" density="compact" variant="outlined" v-model="code"
          class="" style="max-width: 200px;"></v-text-field>
        <v-btn color="error" class="ml-2" @click="applyCode">Apply</v-btn>
      </v-card-title>
      <v-table>
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="index">
            <td>
              <v-btn icon="fluent-delete-20-regular" density="compact" variant="flat"
                @click="removeFromCart(item.name)"></v-btn>
            </td>
            <td>
              <v-img width="35" :src="item.img"></v-img>
            </td>
            <td>
              <div class="text-no-wrap text-subtitle-2">{{ item.name }}</div>
              <div class="text-caption">
                {{ item.selectedSize.description }}
              </div>
            </td>
            <td>
              <v-btn icon="icon-park-outline-reduce-one" density="compact" variant="flat"
                @click="decrementCartItemCount(index)"></v-btn>
            </td>
            <td>
              <div>{{ item.count }}</div>
            </td>
            <td>
              <v-btn icon="icon-park-outline-add-one" density="compact" variant="flat"
                @click="incrementCartItemCount(index)"></v-btn>
            </td>
            <td>
              <div class="font-weight-bold">${{ item.countPrice }}</div>
            </td>
          </tr>
          <tr class="d-none">
            <td colspan="7" class="pl-0 pr-0">
              <v-divider></v-divider>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <div class="text-caption">
                Delivery Fee (free for orders over $50)
              </div>
            </td>
            <td>
              <div class="font-weight-bold">${{ orderAmounts.deliveryFee }}</div>
            </td>
          </tr>
          <tr v-if="discountCode">
            <td colspan="6">
              <div class="text-caption">Discount (10% off)</div>
            </td>
            <td>
              <div class="font-weight-bold">${{ orderAmounts.discount }}</div>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <div class="text-caption">Subtotal</div>
            </td>
            <td>
              <div class="font-weight-bold">${{ orderAmounts.subTotal }}</div>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <div class="text-caption">GST (10%)</div>
            </td>
            <td>
              <div class="font-weight-bold">${{ orderAmounts.gst }}</div>
            </td>
          </tr>
          <tr class="d-none">
            <td colspan="7" class="pl-0 pr-0">
              <v-divider></v-divider>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <div class="font-weight-bold text-body-1">Total</div>
            </td>
            <td>
              <div class="font-weight-bold">${{ orderAmounts.total }}</div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-card>
</template>
<style>
@media (min-width:1264px) {
  .cart-width {
    max-width: 900px !important;
  }
}

@media (min-width:1904px) {
  .cart-width {
    max-width: 100% !important;
  }
}
</style>
