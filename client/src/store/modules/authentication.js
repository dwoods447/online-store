
export default {
    namespaced: true,
    state: {
        csrfToken: null,
        isLoggedIn: null,
        customer: null,
    },
    mutations: {
        setLogOut(state){
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
    },
    actions: {
        setLogOut(context){
            context.commit('setLogOut');
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
        }
         
    }
}

