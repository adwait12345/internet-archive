import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://openlibrary.org',
})

const fetcher = async (url: string) => {
    const response = await Axios.get(url);
    return response.data;
}


export {fetcher, Axios};