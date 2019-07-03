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
                                            <!-- <li>Publisher: {{ product.Book.Publisher.name }}</li> -->
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
                    <div class="panel-block" style="display: block;">
                        <h1>${{ product.price }} USD</h1>
                    <b-button type="is-primary" style="display: block; width: 100%;" @click="addProductToCart(product)">Add to Cart</b-button>                  
                    </div>
                    <div class="panel-block" v-if="productInCart">
                    <b-button type="is-primary" style="display: block; width: 100%;" @click="removeProductFromCart(product)">Remove from Cart</b-button>
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
                product: {},
                productInCart: false,
            }
    },
    methods: {
         addProductToCart(product){
            //  console.log(`Product ${JSON.stringify(product)}`);
            //  console.log(`Decreasing Product ID: ${JSON.stringify(product.id)}`)
            this.productInCart = true;
            this.$store.dispatch('addProductToShoppingCart', product);
             this.$store.dispatch('calculateCartTotal');
          
        },

        removeProductFromCart(product){
            console.log(`Removing Product: ${JSON.stringify(product)}`);
             this.$store.dispatch('removeProductFromShoppingCart', product);
              const itemStillInCart = this.$store.state.shoppingCart.findIndex(item => item.id === product.id);
                if(itemStillInCart === -1){
                    console.log(` not in cart anymore`)
                    this.productInCart = false;
                }

         },

        async getBookAuthors(bookID){
            this.authors = [];
            //const bookID = this.$store.state.route.params.product.Book.id;
             // console.log('Getting Authors with id ' + bookID);
            const authors = (await BookService.getBookAuthors(bookID)).data.data
            if(authors){
                this.authors = authors;
                // console.log(`Authors: ${JSON.stringify(this.authors, null, 2)}`);
               // console.log(`Authors Count = ${this.authors.length}`)
            }
        },
        async getProduct(){
            this.product = {};
            // console.log('Getting product with id ' + productID)
           // const productID = this.$store.state.route.params.productId;
           const bookID = this.$store.state.route.params.bookId
            const product = (await ProductService.getProductByBookId(bookID)).data.data[0]
            if(product){
                this.product = product;
                // console.log('book Id: ' + this.product.Book.id)
                 this.getBookAuthors(this.product.BookId);
                  // console.log(`Product: ${JSON.stringify(this.product, null, 2)}`);
                 
            }
        },

    }
}
</script>