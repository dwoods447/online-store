<template>
    <div>
        <div class="columns">
            <div class="column is-6">
            <div class="panel">
                    <div class="panel-heading">
                      <strong>{{ product.Book.title}}</strong>
                    </div>
                      <div class="panel-block" style="display: block;">
                            <div class="columns">
                                <div class="column is-4">
                                    <div>
                                        <img :src="product.Book.image" alt="">
                                    </div>
                                </div>
                                <div class="column is-8">
                                    <h1>Authors:</h1>
                                    <ul>
                                        <li v-for="author in authors" :key="author.Author.id">{{ author.Author.first_name }} {{ author.Author.last_name}}</li>
                                    </ul>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
             <div class="column is-6">
            <div class="panel">
                    <div class="panel-heading">
                      <strong>&nbsp;</strong>
                    </div>
                    <div class="panel-block">

                    <button type="button">Add to Cart</button>
                    </div>
            </div>
               
                  
            </div>
        </div>
    
    </div>
</template>
<script>
// import Product  from '../components/Product'
import BookService from '../services/BookService'
import ProductService from '../services/ProductService'

export default {
    //  components:{
    //     'product':  Product,
    // },
    created(){
        // Get Author information
          this.getProduct();
    },
    mounted(){
      
    },
    data(){
            return {
                authors: [],
                product: null
            }
    },
    methods: {
        async getBookAuthors(){
            const bookID = this.$store.state.route.params.product.Book.id;
            const authors = (await BookService.getBookAuthors(bookID)).data.data
            if(authors){
                this.authors = authors;
                // console.log(`Authors: ${JSON.stringify(this.authors, null, 2)}`);
               // console.log(`Authors Count = ${this.authors.length}`)
            }
        },
        async getProduct(){
            console.log('Getting product with id ' + productID)
            const productID = this.$store.state.route.params.productId;
            const product = (await ProductService.getProduct(productID)).data.data[0]
            if(product){
                this.product = product;
                 console.log(`Product: ${JSON.stringify(this.product, null, 2)}`);
                 
            }
        }
    }
}
</script>