import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowDownAZ, faArrowDownZA, faFloppyDisk, faMagnifyingGlass, faPenToSquare, faTrashCan, faUserPlus, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faArrowDownAZ, faArrowDownZA, faMagnifyingGlass, faUserPlus, faPenToSquare, faTrashCan, faFloppyDisk)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
