import * as axios from 'axios';

const API_BASE_URL = 'https://api.waterboyrentals.com/api/v1/';

export const Axios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json'
  }
});
Axios.all = axios.all;
