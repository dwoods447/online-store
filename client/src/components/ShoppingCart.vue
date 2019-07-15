<template>
    <div class="container">
        <h1>My Cart</h1>
        <div class="columns">
            <div class="column is-9">
                <div class="panel-heading"><strong>Your Items - ({{ count }})</strong></div>
                    <div class="panel-block" style="display: block;">
                        <div v-if="!emptyCart">
                        <div v-for="product in products" :key="product.id" >
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="columns">
                                        <div class="column is-3"><img :src="product.product.Book.image" style="width: 65%;"></div>
                                        <div class="column is-9">
                                            <ul>
                                                <li>{{ product.product.Book.title }}</li>
                                                <li>Price: {{product.product.price }}</li>
                                                <li>Qty: {{  product.quantity }}</li>
                                                <a @click="removeCartItem(product)">Remove Cart Item</a>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                </div>
                                 <div class="column is-6">
                                    <div> </div>
                                </div>
                            </div>
                            
                            
                        </div>
                       </div> 
                    </div>
            </div>
            <div class="column is-3">
                <div class="panel">
                    <div class="panel-heading">
                        <div class="columns">
                            <div class="column is-9"><strong>Order Summary</strong></div>
                             <div class="column is-3">USD</div>
                        </div>
                    </div>
                    <div class="panel-block" style="display: block;">
                        <ul>
                            <li>Order Total: &nbsp;&nbsp;{{ orderTotal.toFixed(2) }}</li>
                        </ul>
                        <hr>
                         <ul>
                            <li>Subtotal: &nbsp;&nbsp;{{ orderTotal.toFixed(2) }}</li>
                        </ul>
                        <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                        Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br/>
                        Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque. -->
                    </div>
                </div>
                 <div style="margin: 0em; padding: 0;" v-if="this.$store.state.isLoggedIn">
                        <b-button type="is-primary" style="display: block; width: 100%;" @click="goToCheckout()">Checkout</b-button>
                </div>
                <div style="margin: 0em; padding: 0;" v-if="!this.$store.state.isLoggedIn">
                       <b-button type="is-primary" style="display: block; width: 100%;" @click="goToLogin()">Please Login to Checkout</b-button> 
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProductService from '../services/ProductService'
import { mapState, createNamespacedHelpers } from  'vuex'
import { mapActions } from  'vuex'
// import { mapGetters } from  'vuex'
const { mapGetters } = createNamespacedHelpers('cart');
export default {
    name: 'cart',
    created(){
        // this.getProductIds();
    },
    data(){
        return {
            productInCart: true,
            emptyCart: false,
        }
    },
    methods:{
        removeCartItem(product){
             console.log(`Removing Product: ${JSON.stringify(product.product)}`);
             this.$store.dispatch('cart/removeProductFromShoppingCart', product.product);
              this.$store.dispatch('cart/calculateCartTotal');
              this.$store.dispatch('cart/calculateTotalCartItems');
              const itemStillInCart = this.searchShoppingCart(product.id);
                if(itemStillInCart === -1){
                    // Item has been removed from the cart
                } else {
                  // Decreasing item qty
                }
        },
        goToLogin(){
            this.$router.push({name: 'login'})
        },
        goToCheckout(){
            this.$router.push({name: 'checkout'})
        }
    
    },

    computed: {
        ...mapState([
            'cart',
        ]),
        ...mapActions([
            'cart/removeProductFromShoppingCart',
            'cart/calculateCartTotal',
            'cart/calculateTotalCartItems'
        ]),
        ...mapGetters({
            products: 'getShoppingCart',
            count: 'getShoppingCartCount',
            orderTotal: 'getOrderTotal',
            searchShoppingCart: 'searchShoppingCart'
        })
    }

   
}
</script>