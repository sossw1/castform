import '../env';
import axios, { AxiosResponse } from 'axios';

interface MapboxResponse {
  type: string;
  query: Array<string>;
  features: Array<{
    id: string;
    type: string;
    place_type: Array<string>;
    relevance: number;
    properties: {
      wikidata: string;
    };
    text: string;
    place_name: string;
    matching_place_name: string;
    bbox: Array<number>;
    center: Array<number>;
    geometry: {
      type: string;
      coordinates: Array<number>;
    };
    context: Array<{
      id: string;
      wikidata: string;
      short_code: string;
      text: string;
    }>;
  }>;
  attribution: string;
}

export default {
  request(query: string): Promise<AxiosResponse<MapboxResponse, string>> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.MB_API_KEY}&limit=1`;

    return axios.get<MapboxResponse>(url);
  }
};
