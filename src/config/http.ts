import axios from "axios";

export const http = axios.create({
    baseURL: 'http://185.46.8.130/api/v1/chat'
})