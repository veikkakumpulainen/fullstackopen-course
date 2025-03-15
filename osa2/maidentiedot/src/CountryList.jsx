import React, { use, useEffect } from "react";

const CountryList = ({
  filteredCountries,
  setSearchName,
  weatherData,
  handleShowCountry,
}) => {
  useEffect(() => {
    if (filteredCountries.length === 1) {
      handleShowCountry(filteredCountries[0]);
    }
  }, [filteredCountries, handleShowCountry]);

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}
            <button
              onClick={() => {
                setSearchName(country.name.common);
                handleShowCountry(country);
              }}
            >
              Show
            </button>
          </li>
        ))}
      </ul>
    );
  }

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>
          {`Capital: ${country.capital}`} <br />
          {`Area: ${country.area}`}
        </p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li className={"languages"} key={language}>
              {language}
            </li>
          ))}
        </ul>
        <img
          className={"flag"}
          src={country.flags.png}
          alt={country.name.common}
        />
        {weatherData && (
          <div>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature: {weatherData.main.temp} °Celsius</p>
            <img
              className={"weatherIcon"}
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
            <p>Wind {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default CountryList;
