<script setup>
import { ref, computed } from 'vue'
import { usePizzaStore } from '@/stores/pizzas'
import { storeToRefs } from 'pinia'

const props = defineProps({
  category: {
    type: String,
    // required: true
  },
})

const pizzaStore = usePizzaStore()
const { title, description, items } = storeToRefs(pizzaStore)
</script>
<template>
    <div class="mt-3 mt-md-4">
        <v-row class="">
            <v-col>
                <p class="font-weight-bold mt-1 mt-md-3 mt-sm-2 text-h5 text-md-h3 text-sm-h4" style="font-family: 'Playfair Display', serif !important">
          Pizza Menu </p>
                <p class="mt-2 text-caption text-md-caption" style="max-width: 600px">
          Choose from our plethora of exquisite pizza creations </p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-row>
                    <v-col v-for="(item, index) in items" :key="index" class="justify-center">
                        <PizzaMenuCard :pizza="item" v-if="category === 'pizzas'"/>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4" class="d-lg-block d-none">
                <EditCart/>
            </v-col>
        </v-row>
    </div>
</template>
<style>
</style>
