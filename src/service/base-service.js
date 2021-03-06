import axios from 'axios';
import { config } from '../config';

export default class BaseService {
  constructor() {
    this.api = this.initAxios();
  }

  api;

  initAxios = () => {
    const api = axios.create({
      baseURL: config.baseUrl,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    api.interceptors.request.use(
      config => {
        console.log('REQ URL: ', config.url);
        return config;
      },
      error => {
        return error;
      }
    );

    api.interceptors.response.use(
      response => {
        console.log('RES Status Code: ', response.status);
        return response;
      },
      error => {
        return error;
      }
    );
    return api;
  };
}
