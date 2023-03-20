import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VUE_APP_OMDBAPI_URL,
    timeout: 1000
});

export default {
    async getMovies(params) {
        const { data } = await instance.get("?apikey="+process.env.VUE_APP_OMDBAPI_KEY+"&s=" + params);
        return data;
    },
}