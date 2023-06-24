import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import vuetify from './plugins/vuetify'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'

const app = createApp(App)

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
