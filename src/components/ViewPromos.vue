<script setup>
import { computed } from 'vue'
import { usePizzaStore } from '@/stores/pizzas'

const pizzaStore = usePizzaStore()
const specials = computed(() => pizzaStore.specials)

</script>
<template>
    <div class="promo-grid">
        <v-container style="grid-area: promos" class="bg-white">
            <v-row>
                <v-col>
                    <p class="font-weight-bold text-h6">Rainy day promos</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="(special, index) in specials" :key="index" class="justify-center">
                    <PizzaPromoCard :special="special"/>
                </v-col>
            </v-row>
        </v-container>
        <v-card class=" pa-2" style="grid-area: free-delivery">
            <v-container class="align-center align-sm-start align-xl-center bg-white d-flex flex-column text-center text-sm-left">
                <p class="font-weight-bold text-h6">
          Free delivery for orders over $50 </p>
                <p class="text-caption">Like and follow our facebook page for daily discount codes</p>
                <div class="align-center d-flex justify-center" style="width: 100%;">
                    <v-btn icon="logos-facebook" variant="flat" class="" href="https://www.facebook.com/pinegrow/" target="_blank"></v-btn>
                    <span class="ml-2 text-caption">Follow us</span>
                </div>
            </v-container>
        </v-card>
        <v-card class=" pa-2" style="grid-area: free-fries">
            <v-container class="align-center bg-white d-flex justify-center justify-sm-space-around" style="height: 100%;">
                <div class=" fries">
                    <v-img src="/assets/images/free-fries.png" class=""></v-img>
                </div>
                <div class="align-center ml-2">
                    <p class="font-weight-bold text-h6">Free Fries Friday</p>
                    <p class="text-caption">
            Every friday we have free fries for every $20 order </p>
                </div>
                <div class="align-center bg-light-blue-darken-3 d-flex flex-column justify-center ml-2 pb-1 pl-2 pr-2 pt-1" style="max-height: 120px; height: 100%">
                    <p class="text-caption text-uppercase">IN</p>
                    <p class="font-weight-bold text-h5 text-uppercase">2</p>
                    <p class="text-caption text-uppercase">DAYS</p>
                </div>
            </v-container>
        </v-card>
    </div>
</template>
<style>
.promo-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas: 'free-delivery' 'promos' 'free-fries';
  grid-gap: 24px;
}

@media (min-width: 600px) {
  .promo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: 'free-delivery free-fries' 'promos promos';
    grid-gap: 24px;
  }
}

@media (min-width: 960px) {
  .promo-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: 'promos free-delivery' 'promos free-fries';
    grid-gap: 24px;
  }
}

.fries {
  min-width: 80px;
}

@media (min-width: 1280px) {
  .fries {
    min-width: 100px;
  }
}
</style>
