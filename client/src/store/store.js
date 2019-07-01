import Vue from 'vue';
import Vuex from 'vuex';
import ProductService from '../services/ProductService'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);


const store = new Vuex.Store({
    plugins: [
        createPersistedState({

        })
    ],
    state: {
        shoppingCart: [],
        products: [],
        shoppingCartCount: null,
    },
    mutations: {
        setProducts(state, products){
            state.products = products
        },
        addProductToShoppingCart(state, productId){
            state.shoppingCart.push({id: productId, quantity: 1})
        },
        increasePurchaseItemQty(state, cartItem){
            cartItem.quantity++;
        },
        decreaseAvailableQty(state, product){
            product.qty--;
        },
        increaseShoppingCartCount(state){
            state.shoppingCartCount++;
        },
        removeProductFromShoppingCart(state, product){
            
        },
      

    },
    actions: {
        async getProducts(context){
            const products = (await ProductService.index()).data.data;
            if(products){
                // update products for all components
                context.commit('setProducts', products)
            }
        },

        addProductToShoppingCart(context, product){
            // Make sure the product is in stock
            // if the product qty is greater than 0 check to see if it is already in the cart
            if (product.qty > 0) {
                // if the item is in the cart already
                const cartItem = context.state.shoppingCart.find (item => item.id === product.id);
                if(!cartItem){
                    // add  product to cart
                    context.commit('addProductToShoppingCart', product.id);
                    context.commit('increaseShoppingCartCount');
                    
                   
                } else {
                    // Increase purchase qty
                     context.commit('increasePurchaseItemQty', cartItem);
                     context.commit('increaseShoppingCartCount');
                }
                    // Reduce product available qty
              context.commit('decreaseAvailableQty', product)
            }
        },
      
        removeProductFromShoppingCart(context, product){

        }
    },
    getters: {
        getAvailableProducts(state, getters){
            return state.products.filter(product => product.qty > 0)
        }
    }
});


export default store;