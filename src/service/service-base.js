import axios from 'axios';
import { apiPoints } from './endpoints';

const baseUrl = apiPoints.baseUrl;

export default class DogeService {
  async doGet(url, urlParam) {
    let paramStr = '';
    if (urlParam != null) {
      paramStr = `/${urlParam}`;
    }
    return await axios.get(`${baseUrl}${url}${paramStr}`).catch(function(error) {
      console.log('ERROR (Service Base): ', error);
    });
  }

  async doPost(url, data) {
    return await axios
      .post(`${baseUrl}${url}`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .catch(function(error) {
        console.log('ERROR (Service Base): ', error);
      });
  }
}
