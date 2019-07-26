import Api from './Api'


export default{
    getAllCategories(){
        return Api.get(`/categories/all`);
    },
    getAllBookCategories(){
        return Api.get(`/categories/book/categories`);
    },
    getBookCategory(categoryId){
        return Api.get(`/categories/book/category/${categoryId}`);
    },
    
   
}