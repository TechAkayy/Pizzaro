<template>
    <v-app style="background: #e8e7e7;">
        <NavBar/>
        <v-navigation-drawer expand-on-hover rail>
            <v-list>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Sandra Adams" subtitle="sandra_a88@gmailcom"></v-list-item>
            </v-list>
            <EditCart/>
        </v-navigation-drawer>
        <v-main>
            <v-container style="max-width: 1280px !important;">
                <router-view/>
            </v-container>
        </v-main>
    </v-app>
</template>
