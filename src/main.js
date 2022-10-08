// import devtools from '@vue/devtools'

// if (process.env.NODE_ENV === 'development') {
// 	// devtools.connect(/* host, port */)
// 	// Expose connect on window's object so that connection with Vue Devtools can be conditionally triggered from within Pinegrow
// 	window.devtools = devtools
// }

import 'uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import VueSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

loadFonts()

const app = createApp(App)

app.component('vue-select', VueSelect)
app.use(createPinia()).use(router).use(vuetify).mount('#app')
