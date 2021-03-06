import Api from './Api'


export default{
    index(){
        return Api.get('/products/all');
    },
    decrease(productId, quantity){
        return Api.post(`/products/decrease/product/${productId}/quantity`, quantity)
    },
    increase(productId, quantity){
        return Api.post(`/products/increase/product/${productId}/quantity`, quantity)
    },
    getProduct(productId){
        return Api.get(`/products/product/${productId}`)
    },
    getProductByBookId(bookId, productID){
        return Api.get(`/products/product/${productID}/book/${bookId}/bookInfo`)
    },
    getProductIdByBookId(bookId){
        return Api.get(`/products/product/${productID}/book/${bookId}/bookInfo`)
    }
}