


export default {
    namespaced: true,
    state: {
        products: [],
    },
    mutations: {
        setProducts(state, products){
            state.products = products
        },
    },
    actions: {
        setStoreProducts(context, products){
         context.commit('setProducts', products)
        },
    },
  
    getters: {
        getAvailableProducts(state, getters, rootState, rootGetters){
            return state.products.filter(product => product.qty > 0)
        },
    }
}

