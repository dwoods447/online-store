<template>
    <div>
            <div class="card-container" v-for="book in books" :key="book.id">
                    
                        <div class="card">                       
                            <div class="card-content">
                                <div class="card-image"><img :src="book.Book.image" :alt="book.Book.title"></div>
                                <p class="card-header-title">{{ book.Book.title  }}</p>
                            </div>
                                <!-- <i class="card-footer-item" href="javascript:void(0);" @click="addProductToCart(product)"><i class="fas fa-shopping-cart"></i></a> -->
                        </div>
                     
                </div>  
    </div>
</template>
<script>
import CategoryService from '../services/CategoriesService'
import CategoriesService from '../services/CategoriesService';
export default {
    created(){
       this.getBookCategories();     
    },
    data(){
        return {
            books: [],
        }
    },
    methods:{
        async getBookCategories(){
            const categoryId = this.$store.state.route.params.categoryId;
            console.log(`Getting Books in cat: ${categoryId}`);
            const books = (await CategoriesService.getBookCategory(categoryId)).data.data;
            if(books){
                this.books = books;
                console.log(`Books returned: ${JSON.stringify(books, null, 2)}`)
            }
        }
    }
}
</script>
<style>

</style>
