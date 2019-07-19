<template>
    <div class="container">
        <section>
        <div class="columns" v-if="!notAvailable">
            <div class="column is-9">
            <div class="panel">
                    <div class="panel-heading">
                     &nbsp;
                    </div>
                      <div class="panel-block" style="display: block;">
                            <div class="columns">
                                <div class="column is-2">
                                    <div v-if="product.Book" class="product-image">
                                        <img :src="product.Book.image" alt="">
                                    </div>
                                </div>
                                <div class="column is-10">
                                    <div v-if="product.Book">
                                         <h1 style="font-size: 1.5em;"><strong>{{ product.Book.title}}</strong></h1>
                                    </div>
                                    <div v-if="authors">
                                        <div class="columns">
                                            <div class="column is-1">
                                                <h1 v-if="authors.length > 1"><strong>Authors:</strong></h1>
                                                <h1 v-if="authors.length == 1"><strong>Author:</strong></h1>
                                            </div>
                                            <div class="column is-11">
                                                <ul>
                                                    <li v-for="author in authors" :key="author.Author.id" style="display:inline;">{{ author.Author.first_name }} {{ author.Author.last_name}},&nbsp;</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <ul v-if="product.Book">
                                            <li><strong>ISBN:</strong> {{ product.Book.isbn}}</li>
                                            <li><strong>Copyright Year: </strong>{{ product.Book.copyright }}</li>
                                            <li><strong>Pages: </strong>{{ product.Book.pages }}</li>
                                            <li><strong>Publisher: </strong>{{ product.Book.Publisher.name }}</li>
                                        </ul>
                                    </div>
                                      <div v-if="product.Book">
                                        <h4><strong>Description:</strong></h4>
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
                        <h1 style="margin: 0 auto; text-align: center; font-size: 2.4em;">${{ product.price }} USD</h1>
                    <b-button type="is-primary" style="display: block; width: 100%;" @click="addProductToCart(product)">Add to Cart</b-button>
                    <!-- <b-button type="is-primary" style="display: block; width: 100%;" @click="goToLogin()" v-if="!this.$store.state.isLoggedIn">Please Login to Add To Cart</b-button>                   -->
                    </div>
                    <div class="panel-block" v-if="this.searchShoppingCart(product.id)">
                    <b-button type="is-primary" style="display: block; width: 100%;" @click="removeProductFromCart(product)" >Remove from Cart</b-button>
                    </div>

                    <div class="panel-block" v-if="this.searchShoppingCart(product.id)">
                    <router-link :to="{name:'cart'}" style="text-decoration: none; display: block; width: 100%;"><b-button type="is-primary" style="display: block; width: 100%;" >Go to Cart</b-button></router-link>
                    </div>
                    <div class="panel-block">
                    <router-link :to="{name:'home'}" style="text-decoration: none; display: block; width: 100%;"><b-button type="is-primary" style="display: block; width: 100%;" >Continue Shopping</b-button></router-link>
                    </div>
            </div>
               
                  
            </div>
        </div><!-- end of columns -->
        <div v-if="notAvailable">
            <div class="centered">
                <h1 style="font-size: 2.34em;"><span style="color: red;">We're Sorry Product Not Availabe for Purchase</span></h1>
                <h1><router-link :to="{name: 'book.categories'}">Go Back </router-link></h1>
            </div>
        </div>
      </section>
    </div>
</template>
<script>
// import Product  from '../components/Product'
import BookService from '../services/BookService'
import ProductService from '../services/ProductService'
import { mapState } from  'vuex'
import { mapActions} from  'vuex'
// import { mapGetters } from  'vuex'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('cart')
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
                notAvailable: true,
            }
    },
    methods: {
        goToLogin(){
            this.$router.push({name: 'login'})
        },
         addProductToCart(product){
            this.productInCart = true;
            this.$store.dispatch('cart/addProductToShoppingCart', product);
             this.$store.dispatch('cart/calculateCartTotal');
             this.$store.dispatch('cart/calculateTotalCartItems');
          
        },

        removeProductFromCart(product){
             this.$store.dispatch('cart/removeProductFromShoppingCart', product);
             this.$store.dispatch('cart/calculateCartTotal');
             this.$store.dispatch('cart/calculateTotalCartItems');
              const itemStillInCart = this.$store.state.cart.shoppingCart.findIndex(item => item.id === product.id);
                if(itemStillInCart === -1){
                    this.productInCart = false;
                }

         },

        async getBookAuthors(bookID){
            this.authors = [];
            const authors = (await BookService.getBookAuthors(bookID)).data.data
            if(authors){
                this.authors = authors;
            }
        },
        async getProduct(){
            try {
            this.product = {};
            const bookID = this.$route.params.bookId;
                if(bookID){
                    const product = (await ProductService.getProductByBookId(bookID)).data.data[0];
                        if(product){
                        this.notAvailable = false;
                        this.product = product;
                        this.getBookAuthors(this.product.BookId);
                    }
                } else {
                    this.notAvailable = true;
                }    
            } catch (error){
                console.log(`Product Detail Error: ${error}`);
            }
          
        },

    },
    computed: {
        ...mapGetters([
            'searchShoppingCart'
        ]),
        ...mapState([
            'cart',
        ]),
        
    }
}
</script>
<style scoped>
@media screen and (max-width: 825px){
      .product-image > img{
        width: 230px;
        display: block;
        margin: 0 auto;
    }
}
</style>