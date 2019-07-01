import Api from './Api'


export default{
    index(){
        return Api.get('/books/index');
    },
    getBookAuthors(bookID){
        return Api.get(`/authors/book/${bookID}/authors`);
    }
}