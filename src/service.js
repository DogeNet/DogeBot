import axios from 'axios';

const baseUrl = 'https://jsonplaceholder.typicode.com';

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
