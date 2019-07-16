<template>
    <div class="container">
        <section>
            <div class="columns">
                <div class="column">
                     <h1>Thanks for your order!</h1>
                     <p>Hi {{this.$store.state.customer.first_name}} {{this.$store.state.customer.last_name}},</p>
                     <p>Were processing your order and will let you know when it ships. Thanks for shopping with us.</p>
                </div>
            </div>
             <div class="columns">
                <div class="column">
                     <div class="panel">
                        <div class="panel-heading">&nbsp;Shipping Products ({{ shippingCount }})</div>
                        <div class="panel-block" style="display: block;">

                            <div class="columns">
                                <div class="column is-4">
                                    <div v-for="product in products" :key="product.id" >
                                        <div class="columns">
                                            <div class="column is-6">
                                                <div class="columns">
                                                    <div class="column is-4"><img :src="product.product.Book.image" style="width: 100%;"></div>
                                                    <div class="column is-8">
                                                        <ul>
                                                            <li>{{ product.product.Book.title }}</li>
                                                            <li>Price: {{product.product.price }}</li>
                                                            <li>Qty: {{  product.quantity }}</li>
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
                                     <ul>
                                            <li>Order Total: &nbsp;&nbsp;${{ purchaseTotal.toFixed(2) }}</li>
                                    </ul>
                                </div>
                                 <div class="column is-8">
                                     <h1>Shipping Details</h1>
                                     <ul>
                                         <li style="display: block;">{{ this.$store.state.customer.first_name}} {{ this.$store.state.customer.last_name}}</li>
                                         <li style="display: block;">{{ this.$store.state.customer.address}}</li>
                                         <li style="display: block;">{{ this.$store.state.customer.city }}</li>
                                         <li style="display: block;">{{ this.$store.state.customer.country }}</li>
                                     </ul>
                                     
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
import { mapState, createNamespacedHelpers } from  'vuex'
import { mapActions } from  'vuex'
const { mapGetters } = createNamespacedHelpers('cart');
export default {
    data(){
        return {

        }
    },
    methods: {

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
            count: 'getShoppingCartCount',
            orderTotal: 'getOrderTotal',
            searchShoppingCart: 'searchShoppingCart'
        }),

        products(){
            return this.$store.getters.getPurchasedProducts;
        },
        shippingCount(){
            return this.$store.getters.getShippingProductsCount;
        },
        purchaseTotal(){
            return this.$store.getters.getPurchaseTotal
        }
    }
}
</script>

