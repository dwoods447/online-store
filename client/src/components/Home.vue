<template>
    <div>
        <div class="card-container">
           <div class="card">
            <div class="card-header"> <p class="card-header-title">Card Title</p></div>
             <div class="card-content">
                    Content
             </div>
             <footer class="card-footer">
                <a class="card-footer-item">Save</a>
                <a class="card-footer-item">Edit</a>
                <a class="card-footer-item">Delete</a>
            </footer>
         </div>
        </div>
       
    </div>
</template>
<script>
import ProductService from '../services/ProductService'

export default {
    created(){
        this.getAllProducts();
    },
    data: function(){
        return {
            
        }
    },
    methods: {
        async getAllProducts(){
            const products = (await ProductService.index()).data.data;
            if(products){
                // Products to sell
            }
        }
    }
}
</script>
<style>
    .card-container{
        max-width: 250px;
    }
</style>