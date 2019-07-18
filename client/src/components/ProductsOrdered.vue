<template>
    <div class="container">
        <section>
            <div class="columns">
                <div class="column id-12" v-if="this.$store.state.customer">
                    <div class="panel-heading"><h1>Order #{{ this.$route.query.orderId}} for {{this.$store.state.customer.first_name }} {{this.$store.state.customer.last_name }}</h1></div>
                    <div class="panel-block" style="display: block;">
                      <div class="columns">
                          <div class="column is-6">
                              <div v-for="product in products" :key="product.id" >
                                    <div class="columns">
                                        <div class="column is-10">
                                            <div class="columns">
                                                <div class="column is-3"><img :src="product.p.Book.image" style="width: 65%;"></div>
                                                <div class="column is-9">
                                                    <ul>
                                                        <li>{{ product.p.Book.title }}</li>
                                                        <li>Price: &nbsp;${{product.p.price }}</li>
                                                        <li>Qty Purchased: {{  product.qty }}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="column is-2">
                                            <div> 
                                            
                                            </div>
                                        </div>
                                    </div>
                             </div>
                          </div>
                          <div class="column is-6">
                            <h1>Shipping Info:</h1>
                            <p>{{this.$store.state.customer.first_name }} {{this.$store.state.customer.last_name }}</p>
                            <p>{{ order.shipping_address }}</p>
                            <p>{{ order.shipping_city }}</p>
                            <p>{{ order.shipping_country }}</p>
                            <br/>
                            <h1>Order Total:</h1> 
                            <p>${{ orderTotal.toFixed(2) }}</p>
                          </div>
                      </div>  
                    </div>
                </div>     
             </div>
        </section>
    </div>
</template>
<script>
import OrderService from '../services/OrderService'
import ProductService from '../services/ProductService'
export default {
    created(){
        const orderID = this.$route.query.orderId;
        this.getProductsOrdered(orderID);
        this.getOrderInformation(orderID);
    },
    data(){
        return {
            order: {},
            orderedProducts: [],
            simpleProducts: [],
            orderTotal: 0,
        }
    },
    methods: {
         async productLookUp(qty, productID){
           const retirevedProduct  = (await ProductService.getProduct(productID)).data.data;
           if(retirevedProduct.length > 0){
               this.orderTotal  +=(retirevedProduct[0].price * qty);
               this.orderedProducts.push({ qty: qty, p: retirevedProduct[0]});
           }
        },

        async getProductsOrdered(orderId){
            const products = (await OrderService.getOrderProductsByOrderId(orderId)).data.data;
            if(products.length > 0){
                products.forEach(product => {
                   this.productLookUp(product.qty, product.ProductId);
                })
            }
        },
        async getOrderInformation(orderId){
            const order = (await OrderService.getOrderInformationById(orderId)).data.data;
            if(order.length > 0){
                this.order = order[0];
            }
        }
    },
    computed: {
        products(){
            return this.orderedProducts;
        }
    }
}
</script>
