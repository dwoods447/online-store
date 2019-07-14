
import axios from 'axios';
//import store from '../store/store'

// console.log('Store Getters: '+ store.getters.getToken);
//console.log('Store State: '+ store.state.csrfToken);
const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        //'XSRF-TOKEN': `${store.state.csrfToken}`
    }
});

export default AxiosInstance;