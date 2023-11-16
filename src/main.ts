import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import axios from 'axios'
import _ from 'lodash'

App.delimiter = ['${', '}']
const app = createApp(App)
app.provide('axios', axios)
app.provide('lodash', _)
app.use(ToastPlugin)
app.mount('#app')
