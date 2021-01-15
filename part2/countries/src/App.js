import React, { useState, useEffect } from 'react'
import axios from 'axios'


const CountryDetails = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name} >{language.name}</li>)}
      </ul>
      <img width="150" alt={`${country.name} flag`} src={country.flag} />
    </div>
  )
}

const CountryItem = ({country}) => {
  const [selectedCountry, setSelectedCountry] = useState()

  const handleClick = () => {
    setSelectedCountry(country)
  }
  if(selectedCountry) {
    return <CountryDetails country={selectedCountry} />
  }
  return <p key={country.name}>{country.name} <button onClick={handleClick}>Show</button></p>
}


const CountryList = ({countries}) => {
  if (countries.length > 10) return <p>Too many matches, specify another filter</p>
  if (countries.length === 1) return <CountryDetails country={countries[0]} />
  return countries.map(country => <CountryItem country={country} />)
}


function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase())

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
      
  }, [])  

  const filteredCountries = countries.filter(person => person.name.toLowerCase().includes(filter))

  return (
  <div>
    <p>find countries
      <input 
        onChange={handleFilterChange} />
    </p>
    <CountryList countries={filteredCountries} />
  </div>
  )
}

export default App;
