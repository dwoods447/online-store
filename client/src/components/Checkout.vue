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
                        <div class="panel-block" style="display: block;">
                            <div class="content">
                               <b-button type="is-primary" style="display: block; width: 100%; height: 43px; padding: 0.1em;" @click="hasCreditCard">Credit Card</b-button>
                               <div class="separator">OR</div>
                               <b-button  type="is-primary"  style="display: block; width: 100%; height: 43px; padding: 0.1em;" @click="hasPayPal"><img src="../assets/paypal.svg"></b-button>
                            </div>
                        </div>
                        </b-collapse>
                        <b-collapse  aria-id="contentIdForA11y1" v-if="isCreditCard">
                        <div
                            slot="trigger" 
                            slot-scope="props"
                            class="panel"
                            role="button"
                            aria-controls="contentIdForA11y1">
                            <div class="panel-heading"> <a> <p><strong>Shipping Address</strong></p><b-icon :icon="props.open ? 'menu-down' : 'menu-up'" style="display: inline;"></b-icon></a></div>
                        </div>
                        <div class="panel-block" >
                            <div class="content" style="width: 100%;">
                               <form>
                                    <b-field label="First Name">
                                        <b-input v-model="first_name"></b-input>
                                    </b-field>
                                    <b-field label="Last Name">
                                        <b-input v-model="last_name"></b-input>
                                    </b-field>
                                    <b-field label="Phone">
                                        <b-input v-model="phone"></b-input>
                                    </b-field>
                                    <b-field label="Street Address">
                                        <b-input v-model="address"></b-input>
                                    </b-field>
                                     <b-field label="City">
                                        <b-input v-model="city"></b-input>
                                     </b-field>
                                    <b-field label="Country">
                                        <b-input v-model="country"></b-input>
                                    </b-field>

                                    <b-button @click="goToCreditCardInfo" type="is-primary"  style="display: block; width: 100%; height: 43px; padding: 0.1em;">Continue</b-button>
                               </form>
                            </div>
                        </div>
                        </b-collapse>
                         <b-collapse  aria-id="contentIdForA11y4" v-if="isPaypal">
                        <div
                            slot="trigger" 
                            slot-scope="props"
                            class="panel"
                            role="button"
                            aria-controls="contentIdForA11y4">
                            <div class="panel-heading"> <a> <p><strong>Paypal Payment</strong></p><b-icon :icon="props.open ? 'menu-down' : 'menu-up'" style="display: inline;"></b-icon></a></div>
                        </div>
                        <div class="panel-block" style="display: block;">
                            <div class="content">
                              I'm sorry this feature has been disabled.
                            </div>
                        </div>
                        </b-collapse>
                        <br/>
                         <b-collapse  aria-id="contentIdForA11y4" v-if="creditCardInfoReady">
                        <div
                            slot="trigger" 
                            slot-scope="props"
                            class="panel"
                            role="button"
                            aria-controls="contentIdForA11y4">
                            <div class="panel-heading"> <a> <p><strong>Payment Details</strong></p><b-icon :icon="props.open ? 'menu-down' : 'menu-up'" style="display: inline;"></b-icon></a></div>
                        </div>
                        <div class="panel-block" style="display: block;">
                            <div class="content">
                              I'm sorry this feature has been disabled.
                            </div>
                        </div>
                        </b-collapse>
                        <br/>
                        <b-button v-if="displayPay" @click="checkOut" type="is-primary"  style="display: block; width: 100%; height: 43px; padding: 0.1em;">Pay</b-button>
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
import OrderService from '../services/OrderService'
import { mapState, createNamespacedHelpers } from  'vuex'
import { mapActions } from  'vuex'
const { mapGetters } = createNamespacedHelpers('cart');
export default {
    data(){
        return{
            first_name: '',
            last_name: '',
            phone: '',
            address: '',
            city: '',
            country: '', 
            isCreditCard: false,
            isPaypal: false,
            displayPay: false,
            creditCardInfoReady: false,
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

        hasCreditCard(){
            this.isCreditCard = true;
            this.isPaypal = false;
        },

        hasPayPal(){
            this.isPaypal = true;
            this.isCreditCard = false;
            this.displayPay = true;
        },

        checkOut(){
            if(confirm('Are You Sure You Want to Order these items ?')){
                let order  = {}; 
                let products, customer;
                products = this.$store.state.cart.searchShoppingCart;
                customer = this.$store.state.customer;
                order = {
                  'products': products,  // array of objects
                  'customer': customer, // object

                }
                console.log(`Ordering ${JSON.stringify(order)}`);
                const ordered = OrderService.orderProduct(order);

            } else{

            }
        },
        goToCreditCardInfo(){
            this.creditCardInfoReady = true;
            this.displayPay = true;
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
<style scoped>
  .separator{
    font-size: 1.1rem;
    margin-top: 1.3em;
    margin-bottom: 1.3em;
    display: flex;
    align-items: center;
    text-align: center;
  }
  .separator::before {
    margin-right: 0.15em;
}
 .separator::before, .separator::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
} 
</style>