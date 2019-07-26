<template>
    <div class="container">
        <h1 v-if="books.length > 0" style="margin: 0 auto; text-align:center;">{{ books[0].Category.name }}</h1>  
        <div class="columns is-multi-line" v-if="books.length > 0">
             
            <div class="column is-narrow" v-for="book in books" :key="book.id">
                <!-- <router-link :to="{name: 'product.detail', params: {bookId: book.BookId, product: {}}}"> -->
                    <div class="card-container">
                        <div class="card">                       
                            <div class="card-content">
                                <div class="card-image"><img :src="book.Book.image" :alt="book.Book.title"></div>
                                <p class="card-header-title">{{ book.Book.title  }}</p>
                            </div>
                                <!-- <i class="card-footer-item" href="javascript:void(0);" @click="addProductToCart(product)"><i class="fas fa-shopping-cart"></i></a> -->
                        </div>
                </div>  
                <!-- </router-link> -->
            </div>
        </div>
        <div v-if="books.length <= 0">
            <h2 style="margin: 0 auto; text-align:center;">We're not selling books in this category yet...</h2>
        </div>
           
    </div>
</template>
<script>
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
            const categoryId = this.$route.params.categoryId;
            const books = (await CategoriesService.getBookCategory(categoryId)).data.data;
            if(books){
                this.books = books;
            }
        }
    }
}
</script>
<style scoped>
    .card-container{
        margin: 0 auto;
    }
</style>
