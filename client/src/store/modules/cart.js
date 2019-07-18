

export default {
    namespaced: true,
    state: {
        shoppingCart: [],
        shoppingCartCount: null,
        orderTotal: 0,
        customer: null,
    },
    mutations: {
        
         clearAllInCart(state){
            state.shoppingCartCount = null;
            state.shoppingCart = [];
            state.orderTotal = 0;
         },
        addProductToShoppingCart(state, product){
            state.shoppingCart.push({id: product.id, product: product, quantity: 1})
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
            if(state.shoppingCartCount <= 0){
                state.orderTotal = 0;
            }
        },
        removeProductFromShoppingCart(state, productIndex){
            const product = state.shoppingCart[productIndex];
            if(product.quantity > 0){
                // Decrease qty      
            } else {
                state.shoppingCart.splice(productIndex, 1);
                state.shoppingCartCount--;
                if(state.shoppingCartCount <= 0){
                    state.shoppingCartCount = null;
                    state.orderTotal = 0;
                }
            }
           
        },
        calculateCartTotal(state, orderTotal){
            state.orderTotal = orderTotal;
        },
        calculateTotalCartItems(state, total){
            state.shoppingCartCount = total;
            if(state.shoppingCartCount <= 0){
                state.shoppingCartCount = null;
            }
        }
    },
    actions: {
        addProductToShoppingCart(context, product){
            // Make sure the product is in stock
            // if the product qty is greater than 0 check to see if it is already in the cart
            if (product.qty > 0) {
                // if the item is in the cart already
                const cartItem = context.state.shoppingCart.find (item => item.id === product.id);
                if(!cartItem){
                    // add  product to cart
                    context.commit('addProductToShoppingCart', product);
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
        calculateCartTotal(context){
            let orderTotal = 0;
            context.state.shoppingCart.forEach((item)=>{
                 orderTotal += parseFloat(item.product.price) * parseInt(item.quantity)
            })
            context.commit('calculateCartTotal', orderTotal);
        },
        calculateTotalCartItems(context){
            let totalItems = 0;
            context.state.shoppingCart.forEach((item)=>{
                totalItems += 1
           })
           context.commit('calculateTotalCartItems', totalItems);
        },
        removeProductFromShoppingCart(context, product){
            const productToDecrease = context.state.shoppingCart.find(cartItem => cartItem.id === product.id);
            const productIndex = context.state.shoppingCart.findIndex(cartItem => cartItem.id === product.id);
            //Check Shopping cart for product with matching id
            if(productIndex !== -1){
                context.commit('decreaseShoppingCartCount');
                context.commit('decreasePurchaseItemQty', productToDecrease);
                // if you found the product in the cart remove it from shopping cart
                context.commit('removeProductFromShoppingCart', productIndex);
            }    
        },
        
    },
   
    getters: {
        getShoppingCartCount(state, getters){
            return state.shoppingCartCount;
        },
        getOrderTotal(state, getters){
            return state.orderTotal;
        },
        getShoppingCart(state, getters, rootState, productID){
            return state.shoppingCart;
        },
        searchShoppingCart: (state) => (id) => {
            return (state.shoppingCart.findIndex(cartItem => cartItem.id === id) !== -1)
        }
    }
}


 