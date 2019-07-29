import Vue from 'vue'
import Vuex from 'vuex'
 // import VuexPersistence from 'vuex-persist'
  import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);
import cart from './modules/cart'
const store = new Vuex.Store({
     //plugins: [new VuexPersistence({supportCircular: true}).plugin],
       plugins: [createPersistedState()],
    modules: {
        cart
    },
    state: {
        products: [],
        csrfToken: null,
        jwtToken: null,
        isLoggedIn: false,
        customer: null,
        purchasedProducts: [],
        purchaseTotal: 0,
    },
    mutations: {
        setLogOutMutation(state){
            state.isLoggedIn = false;
            state.customer = null;
            state.jwtToken = null;
            state.purchasedProducts = [];
            state.purchaseTotal = 0;
        },
        setLogin(state){
            if(state.customer){
                state.isLoggedIn = true;
            }
        },
        setCurrentLoggedInCustomer(state, customer){
            state.customer = customer;
        },
        setCSRFToken(state, token){
            state.csrfToken = token;
        },
        setProducts(state, products){
            state.products = [];
            state.products = products;
        },
        setPurchasedProductsMutation(state, products){
            state.purchasedProducts = [];
            state.purchasedProducts = products;
        },
        setPurchaseTotalMutation(state, total){
            state.purchaseTotal = total;
        },
        clearPurchaseTotal(state){
            state.purchaseTotal = 0;
        },
        clearPurchasedProducts(state){
            state.purchasedProducts = [];
        },
        setJWTtokenMutation(state, token){
            state.jwtToken = token;
        },
        clearJWTtokenMutation(state){
            state.jwtToken = null; 
        },

    },
    actions: {
        setLogOut(context){
            context.commit('setLogOutMutation');
        },
        setLogIn(context){
            context.commit('setLogin');
        },
        setPurchaseTotal(context, total) {
            context.commit('setPurchaseTotalMutation', total);
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
        setPurchasedProducts(context, products){
            context.commit('setPurchasedProductsMutation', products);   
        },
        clearPurchaseTotal(context){
            context.commit('clearPurchaseTotal');
        },
        clearPurchasedProducts(context){
            context.commit('clearPurchasedProducts');
        },
        setJWTtokenAction(context, token){
            context.commit('setJWTtokenMutation', token);
        },
        clearJWTtokenAction(context){
            context.commit('clearJWTtokenMutation');
        }
    },
    getters: {
        isLoggedIn(state, getters){
            return state.isLoggedIn;
        },
        getToken(state, getters){
            return state.jwtToken;       
        },
        getCustomer(state, getters){
            return state.customer;
        },
        getPurchasedProducts(state, getters){
            return state.purchasedProducts
        },
        getShippingProductsCount(state, getters){
            return state.purchasedProducts.length
        },
        getPurchaseTotal(state, getters){
            return state.purchaseTotal;
        },
        getAvailableProducts(state){
          return state.products.filter(product => product.qty > 0);
        }
         
    },
    


});
export default store