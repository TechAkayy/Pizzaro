// import devtools from '@vue/devtools'
// if (process.env.NODE_ENV === 'development') {
// 	devtools.connect(/* host, port */)
// }

import 'uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import { VueSelect } from 'vue-select'
import 'vue-select/dist/vue-select.css'

loadFonts()

const app = createApp(App)

app.component('vue-select', VueSelect)
app.use(createPinia()).use(router).use(vuetify).mount('#app')
