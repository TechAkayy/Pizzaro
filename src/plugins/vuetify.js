// Styles
// import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
// import '../styles/main.scss'

// Vuetify
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const myCustomLightTheme = {
	dark: false,
	colors: {
		background: '#FFFFFF',
		surface: '#FFFFFF',
		primary: '#6200EE',
		'primary-darken-1': '#3700B3',
		secondary: '#03DAC6',
		'secondary-darken-1': '#018786',
		error: '#B00020',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FB8C00'
	}
}

export default createVuetify({
	// https://next.vuetifyjs.com/en/features/theme/#setup
	theme: {
		defaultTheme: 'myCustomLightTheme',
		themes: {
			myCustomLightTheme
		}
	},

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
