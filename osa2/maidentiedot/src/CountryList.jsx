import React from "react";

const CountryList = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
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
        <img src={country.flags.png} alt={country.name.common} />
      </div>
    );
  }

  return null;
};

export default CountryList;
