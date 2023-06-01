import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/style.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGear, faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faGear, faXmark)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .mount('#app')
