<template>
    <div class="container">
        <section class="section">
            <div class="columns">
                <div class="column is-12">
                    <paginate name="products" :list="products" ref="paginator" role="tablist" class="paginate-list-wrapper" :per="10">
                        <div class="columns is-multiline">
                                <product :product="product" :key="product.id" v-for="product in paginated('products')"></product> 
                        </div>
                    </paginate>
                    <div style="margin: 1em; padding: 1em;">
                            <div class="paginate-links-container">
                                <paginate-links for="products" :show-step-links="false"  :limit="3"></paginate-links>
                            </div><!-- paginate-links-container -->
                    </div>
                </div>
                <!-- <div class="column is-2">
                    <h2>Shopping Cart</h2>
                    <cart></cart>
                </div> -->
            </div>
        </section>
    </div>
</template>
<script>
import Product from './Product'
import ProductService from '../services/ProductService'
import { mapState } from  'vuex'
import { mapGetters } from  'vuex'
import { mapActions} from  'vuex'
export default {
    created(){
        this.getProducts();
    },
    components:{
        'product':  Product,
    },
    data: function(){
        return {
          paginate: ['products'],
        }
    },
    methods: {
       async getProducts(context){
            const products = (await ProductService.index()).data.data;
            if(products){
                // update products for all components
                this.$store.dispatch("products/setStoreProducts", products)
            }
        },

    },
    computed:{
        // products(){
        //     return this.$store.getters.getAvailableProducts
        // },

        ...mapGetters({
            products: 'products/getAvailableProducts'
        }),
        ...mapState([
            
        ]),
         ...mapActions([
             'products/setStoreProducts'
         ])
    }
}
</script>
<style>
    .card-container{
        width: 250px;
       
    }
    .card-content{
        width: 250px;
        height: 480px;
        padding: 0.5em;
    }
    .card{
        width:250px;
        margin: 0 auto !important;
    }
</style>