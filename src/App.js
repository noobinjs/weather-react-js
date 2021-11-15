import Form from './Form';
import Context from './context';
import { useState, useEffect } from 'react';
import List from './list';

function App() {
  const [weatherList, setWeatherList] = useState([]);
  const [already, setAlready] = useState(false);
  const [find, setFind] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('weather')) {
      const storage = JSON.parse(localStorage.getItem('weather'));
      setWeatherList(storage);
      // console.log('mount')
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('weather', JSON.stringify(weatherList));
  }, [weatherList]);

  async function getWeather(city) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=f29a1cdfd9644875b39204230210111&q=${city}&aqi=no`
    );
    const data = await response.json();
    // console.log(data.current)
    const weather = data.current;
    const weatherLocation = data.location;
    if (weather) {
      const icon = 'https://' + weather.condition.icon.substring(2);
      console.log(icon);
      if (weatherList.find((item) => item.city.includes(city))) {
        setAlready(true);
        setTimeout(() => setAlready(false), 2000);
        return;
      }

      setWeatherList(
        weatherList.concat([
          {
            city: weatherLocation.name,
            country: weatherLocation.country,
            temp: weather.temp_c,
            id: Date.now(),
            icon,
          },
        ])
      );
      // localStorage.setItem('weather', JSON.stringify(weatherList) )
      // console.log('weather1',weatherList)
    } else {
      setFind(true);
      // console.log('can`t find')
      setTimeout(() => setFind(false), 2000);
    }
  }
  function removeCity(id) {
    setWeatherList(weatherList.filter((item) => item.id !== id));
  }
  return (
    <Context.Provider value={{ getWeather, removeCity }}>
      <div className="container">
        {weatherList.length > 0 ? <span></span> : <h1>Weather list</h1>}
        <Form />
        {already ? <span className="already">Already in list</span> : ''}
        {find ? <span className="already">Unknown city</span> : ''}
        <List weather={weatherList} />

        {/* { weatherList.map((item, index) => <p>{item} key={index}</p>
        
      )} */}
      </div>
    </Context.Provider>
  );
}

export default App;
