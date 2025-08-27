import { createApp } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App.vue'
import router from './routers'

const app = createApp(App)
app.use(createBootstrap({ components: true, directives: true }))
app.use(router)
app.mount('#app')
