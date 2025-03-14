import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import axios from "axios";

const App = () => {
  const [searchName, setSearchName] = useState("");
  const [countries, setCountries] = useState([]);

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
  };

  const filteredCountries = searchName
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchName.toLowerCase())
      )
    : countries;

  return (
    <div>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />

      <ul>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length > 1 ? (
          filteredCountries.map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
          ))
        ) : filteredCountries.length === 1 ? (
          (() => {
            const country = filteredCountries[0];
            return (
              <div>
                <h1>{country.name.common}</h1>
                <p>
                  {`Capital ${country.capital}`} <br />
                  {`Area ${country.area}`}
                </p>
                <h2>Languages</h2>
                <ul>
                  {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
                <img src={country.flags.png} alt={country.name.common} />
              </div>
            );
          })()
        ) : null}
      </ul>
    </div>
  );
};

export default App;
