<template>
    <div>
                <div class="card-container">
                     <router-link :to="{name: 'product.detail', params: {bookId: product.BookId }, query: {bookId: product.BookId}}">
                        <div class="card">                       
                            <div class="card-content">
                                <div class="card-image"><img :src="product.Book.image" :alt="product.Book.title"></div>
                                <p class="card-header-title">{{ product.Book.title  }}</p>
                                <p class="card-price"><b-tag type="is-warning" style="font-size: 1.2em; display: block; width: 120px; margin: 0 auto; text-align:center; padding: 0.2em;">${{ product.price }}</b-tag></p>
                            </div>
                           
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
            this.$store.dispatch('cart/addProductToShoppingCart', product);
            this.$store.dispatch('cart/calculateCartTotal');
             this.$store.dispatch('cart/calculateTotalCartItems');
        }
    },
  

}
</script>
<style>
.card-price{
    margin: 1em;
}    
</style>