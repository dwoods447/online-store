import Api from './Api'

export default {
    signUp(info){
        return Api.post('/customers/register', info);
    }
}