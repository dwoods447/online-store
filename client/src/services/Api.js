import store from '../store/store'
console.log(`Header Token: ${store.getters.getToken}`);
console.log(`Header Token: ${store.state.jwtToken}`);
import axios from 'axios';
const AxiosInstance = axios.create({
     //baseURL: 'http://localhost:3000/',
     baseURL: 'https://online-shopping-vue-express.herokuapp.com',
     headers: {
          Authorization: `Bearer ${store.getters.getToken}`
     }
});

export default AxiosInstance;