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
        clearAllInCart(state){
           state.shoppingCart = []; 
        },
        setProducts(state, products){
            state.products = products
        },
        addProductToShoppingCart(state, productId){
            state.shoppingCart.push({id: productId, quantity: 1})
        },
        increasePurchaseItemQty(state, cartItem){
            cartItem.quantity++;
        },
        decreasePurchaseItemQty(state, cartItem){
            cartItem.quantity--;
        },
        increaseAvailableQty(state, product){
            product.qty++;
        },
        decreaseAvailableQty(state, product){
            product.qty--;
        },
        increaseShoppingCartCount(state){
            state.shoppingCartCount++;
        },
        decreaseShoppingCartCount(state){
            state.shoppingCartCount--;
        },
        removeProductFromShoppingCart(state, productIndex){
            const product = state.shoppingCart[productIndex];
            console.log(`Product found ${JSON.stringify(product)}`)
            if(product.quantity > 0){
                // Decrease qty
                console.log('Decreasing purchase qty');
                
            } else {
                console.log('Removing product from cart');
                state.shoppingCart.splice(productIndex, 1);
                state.shoppingCartCount--;
                if(state.shoppingCartCount <= 0){
                    state.shoppingCartCount = null;
                }
            }
           
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

        clearAllInCart(context){
            context.commit('clearAllInCart');
        },
      
        removeProductFromShoppingCart(context, product){
            console.log(`In the store removing...`);
            const productToDecrease = context.state.shoppingCart.find(cartItem => cartItem.id === product.id);
            const productIndex = context.state.shoppingCart.findIndex(cartItem => cartItem.id === product.id);
            console.log(productIndex);
            if(productIndex !== -1){
                console.log(`Product found in the cart descreasing it at index: ${productIndex}`);
                context.commit('decreaseShoppingCartCount');
                context.commit('decreasePurchaseItemQty', productToDecrease);
                // if you found the product in the cart remove it from shopping cart
                context.commit('removeProductFromShoppingCart', productIndex);
            }    
        }   
    },
    getters: {
        getAvailableProducts(state, getters){
            return state.products.filter(product => product.qty > 0)
        }
    }
});


export default store;