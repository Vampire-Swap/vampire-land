import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTint, faMapMarkedAlt, faWallet, faCoins, faChartLine, faChartArea, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBat, faJackOLantern } from './utils/CustomIcons'

library.add(faTint, faMapMarkedAlt, faWallet, faCoins, faChartLine, faChartArea, faJackOLantern, faBat, faBars, faTimes)

const app = createApp(App);

app.config.globalProperties.$filters = {
    usd(value: string): string {
        return '$' + value;
    }
}

app.component('fa-icon', FontAwesomeIcon);

app.use(router).mount('#app')
