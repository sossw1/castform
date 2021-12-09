import '../env';
import axios from 'axios';

export default {
  request(query: string) {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WS_API_KEY}&query=${query}&units=f`;
    return axios.get(url);
  }
};
