import axios from 'axios';
const BASE_URL = 'http://92.51.39.80:8080';
//const BASE_URL = 'http://192.168.100.102:8080';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});