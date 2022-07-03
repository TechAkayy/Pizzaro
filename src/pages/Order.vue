<template>
    <v-container class="pl-0">
        <v-btn prepend-icon="material-symbols-arrow-back-rounded" variant="text" class="font-weight-bold text-subtitle-2" to="/">Back to Menu</v-btn>
    </v-container>
    <v-container>
        <p class="font-weight-bold mt-1 mt-md-3 mt-sm-2 text-h5 text-md-h3 text-sm-h4" style="font-family: 'Playfair Display', serif !important">
					My Order </p>
    </v-container>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" md="false" lg="12" xl="8">
                    <EditOrder/>
                </v-col>
                <v-col cols="12" md="false" lg="false" xl="4">
                    <v-row>
                        <v-col cols="12" md="6" lg="false" xl="12">
                            <EditDeliveryInfo/>
                        </v-col>
                        <v-col cols="12" md="6" lg="false" xl="12">
                            <EditPaymentMethod/>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="4">
</v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<style></style>
