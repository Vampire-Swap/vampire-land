import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTint, faMapMarkedAlt, faWallet, faCoins, faChartLine, faChartArea, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBat, faJackOLantern } from './utils/CustomIcons'
import { ApolloClients } from '@vue/apollo-composable'
import { getApolloClient } from './services/ApolloClient'

library.add(faTint, faMapMarkedAlt, faWallet, faCoins, faChartLine, faChartArea, faJackOLantern, faBat, faBars, faTimes)

const app = createApp(App);

app.config.globalProperties.$filters = {
    usd(value: string): string {
        return '$' + value;
    },

    kformat(value: string): string {
        const valueNumber = parseFloat(value);

        const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

        // what tier? (determines SI symbol)
        var tier = Math.log10(Math.abs(valueNumber)) / 3 | 0;

        // if zero, we don't need a suffix
        if (tier == 0) return valueNumber.toFixed(2);

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);

        // scale the number
        var scaled = valueNumber / scale;

        // format number and add suffix
        return scaled.toFixed(2) + suffix;
    }
}

app.component('fa-icon', FontAwesomeIcon);
app.provide(ApolloClients, {
    spookyswap: getApolloClient("https://api.thegraph.com/subgraphs/name/eerieeight/spookyswap"),
    default: getApolloClient("https://api.thegraph.com/subgraphs/name/eerieeight/spookyswap")
})
app.use(router).mount('#app')
