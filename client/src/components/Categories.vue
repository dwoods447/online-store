<template>
        <div class="container">
              <section class="section">
                <div class="columns is-multiline">
                    <div class="column" v-for="category in categories" :key="category.id">
                        <router-link :to="{name: 'category.detail', params: {categoryId: category.id}}">
                            <div class="card-container">    
                                <div>
                                  {{ category.name }}
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
                </section>
        </div>
</template>
<script>
import CategoriesService from '../services/CategoriesService'
export default {
    created(){
        this.getAllCategories();
    },
    mounted(){

    },
    data(){
        return {
            columns: [0, 1, 2, 3, 4, 5],
            categories: [],
        }
    },
    methods:{
        async getAllCategories(){
            const categories = (await CategoriesService.getAllCategories()).data.data;
            if(categories){
                this.categories = categories;
            }
        },
        addCategory(categoryId){
            console.log(`Adding Categry ID: ${categoryId}`);
        }
    },
    computed:{
       
    }

}
</script>
<style scoped>

</style>
