// Styles
// import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
// import '../styles/main.scss'

// Vuetify
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

export default createVuetify({
	icons: {
		defaultSet: 'class',
		aliases: Object.keys(aliases).reduce((obj, key) => {
			obj[key] = `${aliases[key]}`
			return obj
		}, {}),
		sets: {
			mdi
		}
	}
})
