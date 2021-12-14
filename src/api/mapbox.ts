import '../env';
import axios, { AxiosResponse } from 'axios';

interface MapboxData {
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
  async request(query: string): Promise<AxiosResponse<MapboxData> | null> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.MB_API_KEY}&limit=1`;

    try {
      const response = await axios.request<MapboxData>({
        method: 'get',
        url
      });

      if (response.data.features.length === 0) {
        console.log('Unable to find location');
        return null;
      }

      return response;
    } catch (error) {
      console.log('Unable to connect with geocoding service');
      return null;
    }
  },
  parseCoordinateString({ data }: AxiosResponse<MapboxData>): string {
    let { center } = data.features[0];
    // Reverse order required for weatherstack
    const coordinates = center.reverse().toString();
    return coordinates;
  }
};
