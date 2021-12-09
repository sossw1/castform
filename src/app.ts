import './env';
import mapbox from './api/mapbox';
import weatherstack from './api/weatherstack';

const main = async () => {
  const mapboxData = await mapbox.request('New York, NY');
  const coordinateString = mapbox.parseCoordinateString(mapboxData);
  const weatherstackData = await weatherstack.request(coordinateString);
  console.log(weatherstackData.data);
};

main();
