<script setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'

const orderStore = useOrderStore()
const { cartItems, orderAmounts, discountCode, count } =
  storeToRefs(orderStore)
const {
  removeFromCart,
  incrementCartItemCount,
  decrementCartItemCount,
  clearCart, applyDiscountCode, cartItemsGroupedByName
} = orderStore
let code = ref('')

const applyCode = () => {
  applyDiscountCode(code.value)
  code.value = ''
}

const saved = ref(true)
const toggleSaved = () => saved.value = !saved.value

const show = ref(true)
const toggleShowHide = () => show.value = !show.value

</script>
<template class="">
  <v-card class="pa-0 pb-sm-6 pl-sm-2 pr-sm-2 pt-sm-2">
    <v-container>
      <v-row>
        <v-col>
          <v-card-title>
            <v-icon icon="noto-pizza" size="x-small"></v-icon>
            <span class="ml-1 text-no-wrap">My Cart</span>
            <v-btn icon="clarity-eye-show-solid" color="grey-darken-1" size="x-small" variant="text" class=""
              v-if="show && !saved" @click="toggleShowHide"></v-btn>
            <v-btn icon="clarity-eye-hide-solid" color="grey-darken-1" size="x-small" variant="text" class=""
              v-if="!show && !saved" @click="toggleShowHide"></v-btn>
            <v-spacer></v-spacer>
            <div class="align-center d-none d-sm-flex justify-end text-caption">
              <v-text-field hide-details placeholder="Discount Code" density="compact" variant="outlined" v-model="code"
                class="" style="max-width: 200px; min-width: 150px;"></v-text-field>
              <v-btn color="error" class=" ml-2" @click="applyCode">Apply</v-btn>
            </div>
          </v-card-title>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card elevation="0" border class="pa-2" style="height: 100%;">
            <v-container>
              <v-row justify="center" v-for="(item, index) in cartItems" :key="index" class="flex-nowrap">
                <v-col class="d-none d-sm-block pl-0 pt-5" cols="auto">
                  <div>
                    <v-img width="35" :src="item.img"></v-img>
                  </div>
                </v-col>
                <v-col class="pl-0">
                  <v-table class="">
                    <tbody>
                      <tr>
                        <td colspan="3" class="">
                          <div class="align-center d-flex " style="height: 100%;"><span
                              class="ml-sm-0  text-no-wrap text-subtitle-2">{{ item.name }}</span>
                            <v-btn icon="fluent-delete-20-regular" density="compact" variant="flat"
                              @click="removeFromCart(item.id)" size="small" class="ml-auto" v-if="!saved">
                            </v-btn>
                          </div>
                        </td>
                      </tr>
                      <template v-for="(size, index) in item.sizes">
                        <tr v-if="size.count !== 0 || !show">
                          <td class="" style="width: 100px;">
                            <div class="text-caption">
                              {{ size.description }}
                            </div>
                          </td>
                          <td class="pl-0 pr-0">
                            <div class="d-flex">
                              <div class="d-flex justify-center ml-auto " style="width: 75px;">
                                <v-btn density="compact" @click="decrementCartItemCount(item, size)" variant="outlined"
                                  color="error" icon size="small" v-if="!saved">
                                  <div class="d-flex">
                                    <v-icon icon="ic-baseline-minus" size="small" class=""></v-icon>
                                  </div>
                                </v-btn>
                                <div class="ml-2 pr-2 text-center" style="min-width: 25px;">
                                  <span>{{ size.count }}</span>
                                </div>
                                <v-btn density="compact" @click="incrementCartItemCount(item, size)" variant="outlined"
                                  color="error" icon size="small" v-if="!saved">
                                  <div class="d-flex">
                                    <v-icon icon="ic-baseline-plus" size="small"></v-icon>
                                  </div>
                                </v-btn>
                              </div>
                            </div>
                          </td>
                          <td class="text-right" style="min-width: 70px;">
                            <div>${{ size.countPrice }}</div>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pl-0 pt-6">
                  <div class="d-flex justify-space-between">
                    <v-btn prepend-icon="iconoir-delete-circled-outline" size="small" color="warning"
                      class="text-capitalize" @click="clearCart">Clear cart</v-btn>
                    <v-btn prepend-icon="material-symbols-edit-rounded" class="text-capitalize" size="small"
                      color="info" v-if="saved" @click="toggleSaved">Edit cart</v-btn>
                    <v-btn prepend-icon="material-symbols-save-outline" class="text-capitalize" size="small"
                      color="primary" v-if="!saved" @click="toggleSaved">Save cart</v-btn>
                    <v-btn prepend-icon="icon-park-outline-baby-taste" to="/" class=" text-capitalize" size="small"
                      color="success">Add pizzas</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-2" elevation="0" border style="height: 100%;">
            <v-container>
              <v-row align-content="space-between">
                <v-col class="pl-0" cols="12">
                  <v-table class=" mt-2">
                    <tbody>
                      <tr class="d-none">
                        <td colspan="2" class="pl-0 pr-0">
                          <v-divider></v-divider>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="text-caption">Subtotal</div>
                        </td>
                        <td class="text-right">
                          <div class="font-weight-bold">${{ orderAmounts.subTotal }}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-md-block d-none text-caption">
                            Delivery Fee (free over $50)
                          </div>
                          <div class="d-md-none text-caption">
                            Delivery Fee
                          </div>
                        </td>
                        <td class="text-right">
                          <div class="font-weight-bold">${{ orderAmounts.deliveryFee }}</div>
                        </td>
                      </tr>
                      <tr v-if="discountCode">
                        <td>
                          <div class="text-caption">Discount (10% off)</div>
                        </td>
                        <td class="text-right">
                          <div class="font-weight-bold">-${{ orderAmounts.discount }}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="text-caption">GST (10%)</div>
                        </td>
                        <td class="text-right">
                          <div class="font-weight-bold">${{ orderAmounts.gst }}</div>
                        </td>
                      </tr>
                      <tr class="d-none">
                        <td colspan="2" class="pl-0 pr-0">
                          <v-divider></v-divider>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="font-weight-bold text-body-1">Total</div>
                        </td>
                        <td class="text-right">
                          <div class="font-weight-bold">${{ orderAmounts.total }}</div>
                        </td>
                      </tr>
                      <tr class="d-none">
                        <td colspan="2" class="pl-0 pr-0">
                          <v-divider></v-divider>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
                <v-col class="d-sm-none pl-0">
                  <div class="d-flex">
                    <v-text-field hide-details placeholder="Discount Code" density="compact" variant="outlined"
                      v-model="code" class="" style="max-width: 200px; min-width: 100px;"></v-text-field>
                    <v-btn color="error" class=" ml-2" @click="applyCode">Apply</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<style>
@media (min-width:1280px) {
  .cart-width {
    max-width: 900px !important;
  }
}
</style>
