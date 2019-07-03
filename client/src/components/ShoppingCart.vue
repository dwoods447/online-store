<template>
    <div class="container">
        <h1>My Cart</h1>
        <div class="columns">
            <div class="column is-9">
                <div class="panel-heading"><strong>Your Items - ({{ this.$store.state.shoppingCartCount }})</strong></div>
                    <div class="panel-block" style="display: block;">
                        <div v-if="!emptyCart">
                        <div v-for="product in this.$store.state.shoppingCart" :key="product.id" >
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
                            <li>Order Total: &nbsp;&nbsp;{{ this.$store.state.orderTotal.toFixed(2) }}</li>
                        </ul>
                        <hr>
                         <ul>
                            <li>Subtotal: &nbsp;&nbsp;{{ this.$store.state.orderTotal.toFixed(2) }}</li>
                        </ul>
                        <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                        Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br/>
                        Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque. -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProductService from '../services/ProductService'
export default {
    name: 'cart',
    created(){
        // this.getProductIds();
    },
    data(){
        return {
            products: [],
            orderTotal: 0,
            subTotal: 0,
            productInCart: true,
            emptyCart: false,
        }
    },
    methods:{
        removeCartItem(product){
             console.log(`Removing Product: ${JSON.stringify(product.product)}`);
             this.$store.dispatch('removeProductFromShoppingCart', product.product);
              this.$store.dispatch('calculateCartTotal');
              const itemStillInCart = this.$store.state.shoppingCart.findIndex(item => item.id === product.id);
                if(itemStillInCart === -1){
                    // Item has been removed from the cart
                } else {
                  // Decreasing item qty
                }
        }
    
    },

    computed: {

    }

   
}
</script>