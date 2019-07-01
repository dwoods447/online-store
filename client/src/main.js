import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import {sync} from 'vuex-router-sync'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VuePaginate from 'vue-paginate'

Vue.use(VuePaginate);
Vue.use(Buefy, {
  defaultIconPack: 'fas, mdi, fa, far, fad',
})
sync(store, router)
Vue.config.productionTip = false

new Vue({
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app')
