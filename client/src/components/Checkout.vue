<template>
    <div class="container">
        <section>
                 <h1>Checkout</h1>
                 <div class="columns">
                     <div class="column is-6">
                        <b-collapse  aria-id="contentIdForA11y3">
                        <div
                            slot="trigger" 
                            slot-scope="props"
                            class="panel"
                            role="button"
                            aria-controls="contentIdForA11y3">
                            <div class="panel-heading"> <a> <p><strong>Payment Type</strong></p><b-icon :icon="props.open ? 'menu-down' : 'menu-up'" style="display: inline;"></b-icon></a></div>
                        </div>
                        <div class="panel-block">
                            <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                                <a>#buefy</a>.
                            </div>
                        </div>
                        </b-collapse>
                        <b-collapse  aria-id="contentIdForA11y1">
                        <div
                            slot="trigger" 
                            slot-scope="props"
                            class="panel"
                            role="button"
                            aria-controls="contentIdForA11y1">
                            <div class="panel-heading"> <a> <p><strong>Billing Address</strong></p><b-icon :icon="props.open ? 'menu-down' : 'menu-up'" style="display: inline;"></b-icon></a></div>
                        </div>
                        <div class="panel-block">
                            <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                                <a>#buefy</a>.
                            </div>
                        </div>
                        </b-collapse>
                     </div>





                     <div class="column is-6">
                        <div class="panel">
                        <div class="panel-heading">
                            <div class="columns">
                                <div class="column is-9"><strong>Order Summary</strong></div>
                                <div class="column is-3"><p style="text-align:center;">USD</p></div>
                            </div>
                        </div>
                        <div class="panel-block" style="display: block;">
                            <div v-for="product in products" :key="product.id" >
                                <div class="columns">
                                    <div class="column is-6">
                                        <div class="columns">
                                            <div class="column is-3"><img :src="product.product.Book.image" style="width: 100%;"></div>
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
                                <hr/>
                                
                            </div>
                            <div>
                                <div class="columns">
                                    <div class="column is-10">
                                        <h2><strong>Order Total</strong></h2>
                                    </div>
                                     <div class="column is-2">
                                         <ul>
                                            <li>&nbsp;&nbsp;${{ orderTotal.toFixed(2) }}</li>
                                        </ul>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                </div>
                     </div>
                 </div>
        </section>
    </div>
</template>
<script>
import ProductService from '../services/ProductService'
import { mapState, createNamespacedHelpers } from  'vuex'
import { mapActions } from  'vuex'
const { mapGetters } = createNamespacedHelpers('cart');
export default {
    data(){
        return{

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
