
import {fetcher, Axios} from '../lib/axios'
import useSWR, { mutate } from 'swr'


const searchBooks = (query: string, offset:number, limit:number, parameter:string) => {
    const {data, error, isLoading} = useSWR(`/search.json?${parameter}=${query}&limit=${limit}&offset=${offset}`, fetcher)
    return {data, error, mutate, isLoading}
}

export default searchBooks;