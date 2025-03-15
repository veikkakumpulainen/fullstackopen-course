import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import axios from "axios";
import CountryList from "./CountryList";

const App = () => {
  const [searchName, setSearchName] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
    setSelectedCountry(null);
    setWeatherData(null);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);

    const lat = country.latlng[0];
    const lon = country.latlng[1];

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredCountries = searchName
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchName.toLowerCase())
      )
    : countries;

  return (
    <div>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />
      <CountryList
        filteredCountries={filteredCountries}
        setSearchName={setSearchName}
        handleShowCountry={handleShowCountry}
        weatherData={weatherData}
      />
    </div>
  );
};

export default App;
