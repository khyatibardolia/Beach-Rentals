import axios from 'axios'
import {unauthorized} from "./StatusCodes";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  timeout: 60000
});

service.interceptors.response.use((response) => {
    return response;
}, function (error) {
  if (error.response) {
    if (error.response.status === unauthorized) {
      // toast.error(error.response.data.message)
    }
  }
  return Promise.reject(error.response)
});

service.interceptors.request.use((config) => {
  return config
}, function (error) {
  return Promise.reject(error)
});

export default service
