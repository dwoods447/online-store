import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy, {
  defaultIconPack: 'fas, mdi, fa, far, fad',
})

Vue.config.productionTip = false

new Vue({
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app')
