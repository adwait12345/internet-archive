
import {fetcher, Axios} from '../lib/axios'
import useSWR, { mutate } from 'swr'


const searchAuthors = (query: string) => {
    const {data, error, isLoading} = useSWR(`/search/authors.json?q=${query}`, fetcher)
    return {authorData:data, authorError:error, authorMutate:mutate, isLoading}
}

export default searchAuthors;