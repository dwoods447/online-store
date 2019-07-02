<template>
    <div class="container">
        <h1>My Cart</h1>
        <div class="columns">
            <div class="column is-9">
                <div class="panel-heading"><strong>Your Items - ({{ this.$store.state.shoppingCartCount }})</strong></div>
                    <div class="panel-block" style="display: block;">
                        <div v-for="product in products" :key="product.id">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="columns">
                                        <div class="column is-3"><img :src="product.products.Book.image" style="width: 65%;"></div>
                                        <div class="column is-9">
                                            <ul>
                                                <li>{{ product.products.Book.title }}</li>
                                                <li>Qty: {{  product.qty }}</li>
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
                            <li>Order Total: &nbsp;&nbsp;33.33</li>
                        </ul>
                        <hr>
                         <ul>
                            <li>Subtotal: &nbsp;&nbsp;33.33</li>
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
        }
    },
    methods:{
       getProductIds(){
        for(let i = 0; i < this.$store.state.shoppingCart.length; i++){
            console.log(`${JSON.stringify(this.$store.state.shoppingCart[i].id)}`);
                this.getProducts(this.$store.state.shoppingCart[i].id, this.$store.state.shoppingCart[i].quantity);
            }
        },

        async getProducts(productID, qty){
            console.log(`Getting a product`);
            let products = [];
            products = (await ProductService.getProduct(productID)).data.data[0];
            if(products){
                this.products.push({products: products, qty: qty});
                 console.log(`Product Array${JSON.stringify(this.products, null, 2)}`);
            }
        }
    },

   
}
</script>