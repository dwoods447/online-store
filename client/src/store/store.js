import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);
import cart from './modules/cart'
const store = new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        cart
    },
    state: {
        products: [],
        csrfToken: null,
        isLoggedIn: false,
        customer: null,
    },
    mutations: {
        setLogOutMutation(state){
            state.isLoggedIn = null;
        },
        setLogin(state){
            state.isLoggedIn = true;
        },
        setCurrentLoggedInCustomer(state, customer){
            state.customer = customer;
        },
        setCSRFToken(state, token){
            state.csrfToken = token;
        },
        setProducts(state, products){
            state.products = products;
        },
    },
    actions: {
        setLogOut(context){
            context.commit('setLogOutMutation');
        },
        setLogIn(context){
            context.commit('setLogin');
        },
        setCurrentLoggedInCustomer(context, customer){
            context.commit('setCurrentLoggedInCustomer', customer);
        },
        setStoreCSRFtoken(context, token){
            context.commit('setCSRFToken', token);
        },
        setStoreProducts(context, products){
            context.commit('setProducts', products);
        }, 
    },
    getters: {
        isLoggedIn(state, getters){
            return state.isLoggedIn;
        },
        getToken(state, getters){
            return state.csrfToken;       
        },
        getCustomer(state, getters){
            return state.customer;
        },
        getAvailableProducts(state){
                return state.products.filter(product => product.qty > 0);
        }
         
    },
    


});
export default store