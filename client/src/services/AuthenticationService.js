import Api from './Api'

export default {
    login(credentials){
        return Api.post('/auth/login', credentials)
    },
    logout(){
        return Api.post('/auth/logout');
    },
    csrfToken(){
        return Api.get('/csrf/api/getcsrftoken');
    }
}