<template>
    <v-app style="background: #e8e7e7;">
        <NavBar/>
        <v-main>
            <v-container style="max-width: 1280px !important;">
                <router-view/>
            </v-container>
        </v-main>
    </v-app>
</template>
