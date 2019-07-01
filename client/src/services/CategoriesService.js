import Api from './Api'


export default{
    getAllCategories(){
        return Api.get(`/categories/all`);
    },
    getAllBookCategories(){
        return Api.get(`/book/categories`);
    },
    getBookCategory(categoryId){
        return Api.get(`/book/category/${categoryId}`);
    }
}