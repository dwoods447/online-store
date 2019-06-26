import Api from './Api'


export default{
    index(){
        return Api.get('/books/index');
    }
}