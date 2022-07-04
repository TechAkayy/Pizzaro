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

</script>
<template class="">
    <v-card class="pa-2">
        <v-container class="cart-width">
            <v-card-title>
                <v-icon icon="noto-pizza" size="x-small"></v-icon>
                <span class="ml-1 text-no-wrap">My Cart</span>
                <v-spacer></v-spacer>
                <div class="align-center d-none d-sm-flex justify-end text-caption">
                    <v-text-field hide-details placeholder="Discount Code" density="compact" variant="outlined" v-model="code" class="" style="max-width: 200px; min-width: 150px;"></v-text-field>
                    <v-btn color="error" class="ml-2" @click="applyCode">Apply</v-btn>
                </div>
            </v-card-title>
            <v-row>
                <v-col v-for="(item, index) in cartItemsGroupedByName" :key="index">
                    <v-card class="elevation-0 pa-2" border>
                        <div class="align-center d-flex">
                            <div>
                                <v-img width="35" :src="item.img"></v-img>
                            </div>
                            <div class="ml-2 text-no-wrap text-subtitle-2">{{ item.name }}</div>
                            <v-btn icon="fluent-delete-20-regular" density="compact" variant="flat" @click="removeFromCart(item.id)" class="ml-auto">
</v-btn>
                        </div>
                        <div v-for="(val, index) in 4">size-row</div>
                    </v-card>
                </v-col>
            </v-row>
            <v-table class="mt-2">
                <tbody>
                    <tr v-for="(item, index) in cartItems" :key="index">
                        <td> </td>
                        <td> </td>
                        <td>
                            <div class="text-caption">
                                {{ item.selectedSize.description }}
</div>
                        </td>
                        <td>
                            <div class="align-center d-flex justify-center">
                                <v-btn icon="icon-park-outline-reduce-one" density="compact" variant="flat" @click="decrementCartItemCount(item.id)"></v-btn>
                                <div class="ml-2 pr-2">{{ item.count }}</div>
                                <v-btn icon="icon-park-outline-add-one" density="compact" variant="flat" @click="incrementCartItemCount(item.id)"></v-btn>
                            </div>
                        </td>
                        <td class="text-right">
                            <div class="font-weight-bold">${{ item.countPrice }}</div>
                        </td>
                    </tr>
                    <tr class="d-none">
                        <td colspan="5" class="pl-0 pr-0">
                            <v-divider></v-divider>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div class="text-caption">
                                Delivery Fee (free for orders over $50)
</div>
                        </td>
                        <td class="text-right">
                            <div class="font-weight-bold">${{ orderAmounts.deliveryFee }}</div>
                        </td>
                    </tr>
                    <tr v-if="discountCode">
                        <td colspan="4">
                            <div class="text-caption">Discount (10% off)</div>
                        </td>
                        <td class="text-right">
                            <div class="font-weight-bold">${{ orderAmounts.discount }}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div class="text-caption">Subtotal</div>
                        </td>
                        <td class="text-right">
                            <div class="font-weight-bold">${{ orderAmounts.subTotal }}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div class="text-caption">GST (10%)</div>
                        </td>
                        <td class="text-right">
                            <div class="font-weight-bold">${{ orderAmounts.gst }}</div>
                        </td>
                    </tr>
                    <tr class="d-none">
                        <td colspan="5" class="pl-0 pr-0">
                            <v-divider></v-divider>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div class="font-weight-bold text-body-1">Total</div>
                        </td>
                        <td class="text-right">
                            <div class="font-weight-bold">${{ orderAmounts.total }}</div>
                        </td>
                    </tr>
                    <tr v-if="count !== 0" class="d-sm-none d-table-row">
                        <td colspan="7" class="">
                            <div class="align-center d-flex justify-end text-caption">
                                <v-text-field hide-details placeholder="Discount Code" density="compact" variant="outlined" v-model="code" class="" style="max-width: 200px; min-width: 150px;"></v-text-field>
                                <v-btn color="error" class="ml-2" @click="applyCode">Apply</v-btn>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="count !== 0">
                        <td colspan="7" class="">
                            <div class="align-center d-flex justify-end text-caption">
                                <v-btn prepend-icon="iconoir-delete-circled-outline" variant="flat" class="mb-n2 mt-2 pr-0 text-caption" @click="clearCart">Clear shopping cart</v-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <v-table class="mt-2">
                <tbody>
                    <tr v-for="(item, index) in cartItems" :key="index">
                        <td>
                            <v-btn icon="fluent-delete-20-regular" density="compact" variant="flat" @click="removeFromCart(item.id)">
</v-btn>
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
                            <div class="align-center d-flex justify-center">
                                <v-btn icon="icon-park-outline-reduce-one" density="compact" variant="flat" @click="decrementCartItemCount(item.id)"></v-btn>
                                <div class="ml-2 pr-2">{{ item.count }}</div>
                                <v-btn icon="icon-park-outline-add-one" density="compact" variant="flat" @click="incrementCartItemCount(item.id)"></v-btn>
                            </div>
                        </td>
                        <td class="text-right">
                            <div class="font-weight-bold">${{ item.countPrice }}</div>
                        </td>
                    </tr>
                    <tr class="d-none">
                        <td colspan="5" class="pl-0 pr-0">
                            <v-divider></v-divider>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div class="text-caption">
                                Delivery Fee (free for orders over $50)
</div>
                        </td>
                        <td class="text-right">
                            <div class="font-weight-bold">${{ orderAmounts.deliveryFee }}</div>
                        </td>
                    </tr>
                    <tr v-if="discountCode">
                        <td colspan="4">
                            <div class="text-caption">Discount (10% off)</div>
                        </td>
                        <td class="text-right">
                            <div class="font-weight-bold">${{ orderAmounts.discount }}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div class="text-caption">Subtotal</div>
                        </td>
                        <td class="text-right">
                            <div class="font-weight-bold">${{ orderAmounts.subTotal }}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div class="text-caption">GST (10%)</div>
                        </td>
                        <td class="text-right">
                            <div class="font-weight-bold">${{ orderAmounts.gst }}</div>
                        </td>
                    </tr>
                    <tr class="d-none">
                        <td colspan="5" class="pl-0 pr-0">
                            <v-divider></v-divider>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div class="font-weight-bold text-body-1">Total</div>
                        </td>
                        <td class="text-right">
                            <div class="font-weight-bold">${{ orderAmounts.total }}</div>
                        </td>
                    </tr>
                    <tr v-if="count !== 0" class="d-sm-none d-table-row">
                        <td colspan="7" class="">
                            <div class="align-center d-flex justify-end text-caption">
                                <v-text-field hide-details placeholder="Discount Code" density="compact" variant="outlined" v-model="code" class="" style="max-width: 200px; min-width: 150px;"></v-text-field>
                                <v-btn color="error" class="ml-2" @click="applyCode">Apply</v-btn>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="count !== 0">
                        <td colspan="7" class="">
                            <div class="align-center d-flex justify-end text-caption">
                                <v-btn prepend-icon="iconoir-delete-circled-outline" variant="flat" class="mb-n2 mt-2 pr-0 text-caption" @click="clearCart">Clear shopping cart</v-btn>
                            </div>
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
