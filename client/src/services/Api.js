
import axios from 'axios';
const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        //'XSRF-TOKEN': `${store.state.csrfToken}`
    }
});

export default AxiosInstance;