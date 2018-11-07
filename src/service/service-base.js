import axios from 'axios';
import { apiPoints } from './endpoints';

const baseUrl = apiPoints.baseUrl;

export default class BaseService {
  async doGet(url, urlParam) {
    let paramStr = '';
    if (urlParam != null) {
      paramStr = `/${urlParam}`;
    }

    return await new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl}${url}${paramStr}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
  async doPost(url, data) {
    return await new Promise((resolve, reject) => {
      axios
        .post(`${baseUrl}${url}`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}
