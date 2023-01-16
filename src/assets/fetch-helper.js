import axios from 'axios';

export default async function fetchHelper(method, url, payload) {
    const result = await axios[method](url, payload);
    return result.data;
}