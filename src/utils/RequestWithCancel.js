import axios from 'axios'
import {unauthorized} from "./StatusCodes";

const cancelService = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  timeout: 60000
});

const CancelToken = axios.CancelToken;
let cancel;
let apiUrl;

cancelService.interceptors.response.use((response) => {
  return response;
}, function (error) {
  if (error.response) {
    if (error.response.status === unauthorized) {
      // toast.error(error.response.data.message)
    }
  }
  return Promise.reject(error.response)
});

cancelService.interceptors.request.use((config) => {
  if (apiUrl === config.url.split('?')[0]) {
    if (cancel) {
      cancel();
    }
  } else {
    apiUrl = config.url.split('?')[0]
  }
  config.cancelToken = new CancelToken(function executor(c) {
    cancel = c;
  });
  return config
}, function (error) {
  return Promise.reject(error)
});

export default cancelService
