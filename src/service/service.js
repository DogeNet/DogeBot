import axios from 'axios';
import { apiPoints } from './endpoints';

const baseUrl = apiPoints.baseUrl

export default class DogeService {
  async doGet(url, params) {
    return await axios
      .get(`${baseUrl}${url}`, {
        params: {
          params
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
