<template>
    <div>
        <div class="columns">
            <div class="column is-9">
            <div class="panel">
                    <div class="panel-heading">
                     &nbsp;
                    </div>
                      <div class="panel-block" style="display: block;">
                            <div class="columns">
                                <div class="column is-2">
                                    <div v-if="product.Book">
                                        <img :src="product.Book.image" alt="">
                                    </div>
                                </div>
                                <div class="column is-10">
                                    <div v-if="product.Book">
                                         <h1 style="font-size: 1.5em;"><strong>{{ product.Book.title}}</strong></h1>
                                    </div>
                                    <div v-if="authors">
                                        <h1 v-if="authors.length > 1">Authors:</h1>
                                        <h1 v-if="authors.length == 1">Author:</h1>
                                        <ul>
                                            <li v-for="author in authors" :key="author.Author.id">{{ author.Author.first_name }} {{ author.Author.last_name}}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul v-if="product.Book">
                                            <li>ISBN: {{ product.Book.isbn}}</li>
                                            <li>Copyright Year: {{ product.Book.copyright }}</li>
                                            <li>Pages: {{ product.Book.pages }}</li>
                                            <li>Publisher: {{ product.Book.Publisher.name }}</li>
                                        </ul>
                                    </div>
                                      <div v-if="product.Book">
                                        <h4>Description:</h4>
                                        <p>{{product.Book.synopsis }}</p>
                                    </div> 
                                    <div>
                                        <router-link :to="{name: 'home'}">Back to Products</router-link>
                                    </div>
                                </div>
                                   
                            </div>
                            <!-- <div class="columns">
                                <div class="column">
                                  
                                </div>
                            </div> -->
                    </div><!-- end of panel-block -->
                </div>
            </div>
             <div class="column is-3">
            <div class="panel">
                    <div class="panel-heading">
                      <strong>&nbsp;</strong>
                    </div>
                    <div class="panel-block">
                    <b-button type="is-primary" style="display: block; width: 100%;">Add to Cart</b-button>
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
                product: {}
            }
    },
    methods: {
        async getBookAuthors(bookID){
            this.authors = [];
            //const bookID = this.$store.state.route.params.product.Book.id;
             console.log('Getting Authors with id ' + bookID);
            const authors = (await BookService.getBookAuthors(bookID)).data.data
            if(authors){
                this.authors = authors;
                console.log(`Authors: ${JSON.stringify(this.authors, null, 2)}`);
               // console.log(`Authors Count = ${this.authors.length}`)
            }
        },
        async getProduct(){
            this.product = {};
            // console.log('Getting product with id ' + productID)
            const productID = this.$store.state.route.params.productId;
            const product = (await ProductService.getProduct(productID)).data.data[0]
            if(product){
                this.product = product;
                console.log('book Id: ' + this.product.Book.id)
                 this.getBookAuthors(this.product.BookId);
                  console.log(`Product: ${JSON.stringify(this.product, null, 2)}`);
                 
            }
        }
    }
}
</script>