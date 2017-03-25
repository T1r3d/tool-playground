import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueClipboard from "vue-clipboard2"
import Magic from './utils/magic'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.use(Magic)

window.onload = () => {
    new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App)
    })
}