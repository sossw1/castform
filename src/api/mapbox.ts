import '../env';
import axios from 'axios';

export default {
  request(query: string) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.MB_API_KEY}&limit=1`;

    return axios.get(url);
  }
};
