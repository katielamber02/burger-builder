import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://fir-starter-mine.firebaseio.com'
});

export default instance