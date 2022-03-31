import axios from 'axios';

const baseURL = "https://relienceinsurence.herokuapp.com/api";
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY0MTExNTcwOSwiZXhwIjoxNjQxNzIwNTA5fQ.Zo-NYadPx2OYFkc42KcXf8ZHCkrSUgW_rk6xg8qpjP0";

export const authAxios = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
});

export const multipartAuthAxios = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'multipart/form-data'
    }
});
