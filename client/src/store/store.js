import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);
import cart from './modules/cart'
import products from './modules/products'
import authentication from './modules/authentication'
const store = new Vuex.Store({
    plugins: [createPersistedState({})],
    modules: {
        cart,
        products,
        authentication,
    }
});
export default store