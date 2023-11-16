import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'

App.delimiter = ['${', '}'] // TWIG delimiter for VUE variables
createApp(App).mount('#app')
