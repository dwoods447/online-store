<template>
    <div class="container">
        <h1>My Cart</h1>
        <div class="columns">
            <div class="column is-9">
                <div class="panel-heading"><strong>Your Items - ({{ this.$store.state.shoppingCartCount }})</strong></div>
                    <div class="panel-block" style="display: block;">
                        <div v-if="!emptyCart">
                        <div v-for="product in products" :key="product.id" >
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="columns">
                                        <div class="column is-3"><img :src="product.products.Book.image" style="width: 65%;"></div>
                                        <div class="column is-9">
                                            <ul>
                                                <li>{{ product.products.Book.title }}</li>
                                                <li>Price: {{product.products.price }}</li>
                                                <li>Qty: {{  product.qty }}</li>
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
            </div>
        </div>
    </div>
</template>
<script>
import ProductService from '../services/ProductService'
export default {
    name: 'cart',
    created(){
        this.getProductIds();
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
       getProductIds(){
           console.log(`Getting New product IDs cart length is ${this.$store.state.shoppingCart.length}`);

           if(this.$store.state.shoppingCart.length > 0){
               console.log(`The cart length is ${this.$store.state.shoppingCart.length}`);
                for(let i = 0; i < this.$store.state.shoppingCart.length; i++){
            // console.log(`${JSON.stringify(this.$store.state.shoppingCart[i].id)}`);
                this.getProducts(this.$store.state.shoppingCart[i].id, this.$store.state.shoppingCart[i].quantity);
             }  
           } else {
               this.$store.dispatch('clearAllInCart');
               this.products = [];
               this.emptyCart = true;
               this.orderTotal = 0;
               this.subTotal = 0;
                 console.log(`The cart length is empty clearing....`);
           }
           

        },

        async getProducts(productID, qty){
           // console.log(`Getting a product`);
           let prods;
            this.products = [];
            prods = (await ProductService.getProduct(productID)).data.data[0];
            if(prods){
                this.products.push({products: prods, qty: qty});
                this.calculateTotal(prods, qty);
                 // console.log(`Product Array${JSON.stringify(this.products, null, 2)}`);
            }
        },

        calculateTotal(product, qty){
            this.orderTotal = 0;
            this.orderTotal += (parseFloat(product.price) * qty);
             console.log(`Product recived: ${JSON.stringify(product)} QTY is ${JSON.stringify(qty)}`);
             console.log('Current Total is : ' + this.orderTotal.toFixed(2));
        
        },

        removeCartItem(product){
             console.log(`Removing Product: ${JSON.stringify(product.products)}`);
             this.$store.dispatch('removeProductFromShoppingCart', product.products);
              const itemStillInCart = this.$store.state.shoppingCart.findIndex(item => item.id === product.id);
                if(itemStillInCart === -1){
                    console.log(` not in cart anymore`);
                    let $this = this;
                    setTimeout(function(){
                        $this.getProductIds();
                    },100);
                } else {
                  this.getProductIds();      
                }
        }
    
    },

    computed: {

    }

   
}
</script>