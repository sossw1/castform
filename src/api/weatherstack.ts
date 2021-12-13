import '../env';
import axios, { AxiosResponse } from 'axios';

interface WeatherstackData {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: any;
    weather_descriptions: any;
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: string;
  };
}

export default {
  async request(
    query: string
  ): Promise<AxiosResponse<WeatherstackData> | null> {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WS_API_KEY}&query=${query}&units=f`;

    try {
      const response = await axios.request<WeatherstackData>({
        method: 'get',
        url
      });

      if (!response.data.request) {
        console.log('Unable to find weather');
        return null;
      }
      return response;
    } catch (error) {
      console.log('Unable to connect to weather service');
      return null;
    }
  }
};
