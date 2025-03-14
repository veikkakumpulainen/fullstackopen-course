import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import axios from "axios";
import CountryList from "./CountryList";

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
      <CountryList filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
