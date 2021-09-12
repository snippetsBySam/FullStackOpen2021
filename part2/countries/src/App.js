import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY

function GetWeather ({ country }) {
  const [ weatherData, setWeatherData] = useState([])

  useEffect(() => {
    console.log('weather effect')
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`).then(response => {
        console.log('weather promise fulfilled')
        console.log(response.data)
        console.log(response.data.current.temperature)
        setWeatherData([response.data])
        console.log(response.data)
      }).catch(error => {
        console.log(error);
    })
  }, [country.capital])
  if (weatherData.length > 0) {
    console.log('greater than zero', weatherData)
    const weather = weatherData[0]
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <b>Temperature:</b> {weather.current.temperature} Celcius
        <div>
          <img alt='weather icon' src={weather.current.weather_icons[0]} />
        </div>
        <div><b>Wind:</b> {weather.current.wind_speed} mph, direction {weather.current.wind_dir}</div>
      </div>
    )
  }
  return <div></div>
  
}

function DisplayCountry ({ country }) {
  
  return(
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Spoken languages:</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
      </ul>
      <img alt='flag' width="200" src={country.flag} />
      <GetWeather country={country}/>
    </div>

  )
}
function Results({ countries, filter, onClick}) {
  if (filter) {
    if (countries.length === 1) {
      return <DisplayCountry country={countries[0]} />
    }
    if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>
    }
    else {
      return countries.map(country => <div key={country.alpha3Code}>{country.name} <button id={country.name} onClick={onClick}>show</button> </div>)
    }
  }
  else {
    return <div>Enter a search</div>
  }

}

function App() {
  const [ countries, setCountries] = useState([])
  const [ countryFilter, setCountryFilter] = useState('')

  

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

    

  const countriesToShow = countryFilter ?  (countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))) : countries

  const handleFilterChange = (event) => {    
    setCountryFilter(event.target.value);
  }
  const handleShowButton = (event) => {
    setCountryFilter(event.target.id)
  }

  return (
    <div>
      <h1>Countries</h1>
      <form>
        find countries <input value={countryFilter} onChange={handleFilterChange} />
      </form>
      <div>
        <Results countries={countriesToShow} filter={countryFilter} onClick={handleShowButton} />
      </div>
    </div>
  );
}

export default App;
