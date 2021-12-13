import './env';
import mapbox from './api/mapbox';
import weatherstack from './api/weatherstack';

const main = async () => {
  const locationQuery = process.argv[2];
  if (locationQuery) {
    const mapboxData = await mapbox.request(locationQuery);
    if (mapboxData !== null) {
      console.log(mapboxData.data.features[0].place_name);
      const coordinateString = mapbox.parseCoordinateString(mapboxData);
      const weatherstackData = await weatherstack.request(coordinateString);
      if (weatherstackData) {
        const currentWeather = weatherstackData.data.current;
        console.log(
          `${currentWeather.weather_descriptions}. It is currently ${currentWeather.temperature}\xB0F and feels like ${currentWeather.feelslike}\xB0F.`
        );
      }
    }
  } else {
    console.log('No location query entered');
  }
};

main();
