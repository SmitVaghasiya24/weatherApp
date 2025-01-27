import { useState } from 'react'
import './App.css'

const api = {
  key: '36eba9eb7722f59357388002eff90c46',
  base: 'https://api.openweathermap.org/data/2.5/'

}

function App() {
  const [query, setquery] = useState('')
  const [weather, setweather] = useState({})

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setweather(result);
          setquery('');
          console.log(result);
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div>
      <main>
        <h1>Search Your City</h1>
        <div className='searchBox'>
          <input
            type="text"
            className='searchBar'
            placeholder='search....'
            value={query}
            onChange={(e) => setquery(e.target.value)}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='locationBox'>
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>
                {dateBuilder(new Date())}
              </div>
            </div>
            <div className="weatherBox">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>

            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  )
}

export default App
