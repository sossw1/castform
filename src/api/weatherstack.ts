import '../env';
import axios, { AxiosResponse } from 'axios';

interface WeatherstackResponse {
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request: any;
  data: {
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
  };
}

export default {
  request(query: string): Promise<AxiosResponse<WeatherstackResponse, any>> {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WS_API_KEY}&query=${query}&units=f`;
    return axios.get<WeatherstackResponse>(url);
  }
};
