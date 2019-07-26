
import axios from 'axios';
const AxiosInstance = axios.create({
     //baseURL: 'http://localhost:3000/',
     baseURL: 'https://online-shopping-vue-express.herokuapp.com',
});

export default AxiosInstance;