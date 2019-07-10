<template>
    <div>
                <div class="card-container">
                     <router-link :to="{name: 'product.detail', params: {bookId: product.BookId, product: product }}">
                        <div class="card">                       
                            <div class="card-content">
                                <div class="card-image"><img :src="product.Book.image" :alt="product.Book.title"></div>
                                <p class="card-header-title">{{ product.Book.title  }}</p>
                                <p class="card-price"><b-tag type="is-warning" style="font-size: 1.2em;">${{ product.price }}</b-tag></p>
                            </div>
                                <!-- <i class="card-footer-item" href="javascript:void(0);" @click="addProductToCart(product)"><i class="fas fa-shopping-cart"></i></a> -->
                        </div>
                      </router-link>
                </div>
   </div>
</template>
<script>
export default {
    props: ['product'],
    created(){

    },
    data(){
        return {

        }
    },
    filters:{
        shorten(string){
            return string.substring(0, (string.length/ 1.9))
        }
    },
    methods: {
        addProductToCart(product){
            //  console.log(`Product ${JSON.stringify(product)}`);
            //  console.log(`Decreasing Product ID: ${JSON.stringify(product.id)}`)
            this.$store.dispatch('addProductToShoppingCart', product);
          
        }
    },
  

}
</script>
<style>
.card-price{
    margin: 1em;
}    
</style>