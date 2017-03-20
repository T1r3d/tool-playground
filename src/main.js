import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueClipboard from "vue-clipboard2"

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueClipboard)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})