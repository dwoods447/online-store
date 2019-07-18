<template>
    <div class="container">
        <section class="section">
            <div class="columns">
                <div class="column is-12">
                    <div v-if="products">
                        <paginate name="products" :list="products" ref="paginator" role="tablist" class="paginate-list-wrapper" :per="10">
                            <div class="columns is-multiline">
                                    <product :product="product" :key="product.id" v-for="product in paginated('products')"></product> 
                            </div>
                        </paginate>
                        <div style="margin: 1em; padding: 1em;">
                                <div class="paginate-links-container">
                                    <paginate-links for="products" :show-step-links="false"  :limit="3"></paginate-links>
                                </div>
                        </div>
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
import { createNamespacedHelpers } from 'vuex'
import ProductService from '../services/ProductService'
import { mapState } from  'vuex'
import { mapGetters } from  'vuex'
import { mapActions} from  'vuex'
export default {
    created(){
        
    },
    mounted() {
        this.getProducts();
    },
    components:{
        'product':  Product,
    },
    data: function(){
        return {
          paginate: ['products'],
          products: [],
        }
    },
    methods: {
       async getProducts(){
            const products = (await ProductService.index()).data.data;
            if(products){
                this.products = [];
                this.products = products;
                // this.$store.dispatch("setStoreProducts", this.products);
            }
        },

    },
    computed:{
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