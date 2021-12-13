import './env';
import mapbox from './api/mapbox';
import weatherstack from './api/weatherstack';

const main = async () => {
  const mapboxData = await mapbox.request('Boston, MA');
  if (mapboxData !== null) {
    console.log(mapboxData.data.features[0].place_name);
    const coordinateString = mapbox.parseCoordinateString(mapboxData);
    const weatherstackData = await weatherstack.request(coordinateString);
  }
};

main();
