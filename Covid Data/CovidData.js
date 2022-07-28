import React, { useEffect, useState } from "react";
import "./CovidData.css";
  
function CovidData() {
  const [state, setState] = useState("");
  const [cases, setCases] = useState("");
  const [recovered, setRecovered] = useState("");
  const [deaths, setDeaths] = useState("");
  const [todayCases, setTodayCases] = useState("");
  const [deathCases, setDeathCases] = useState("");
  const [recoveredCases, setRecoveredCases] = useState("");
  const [userInput, setUserInput] = useState("");
  
  useEffect(() => {
    fetch("https://api.covid19india.org/state_district_wise.json ")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  
  const setData = ({
    state,
    cases,
    deaths,
    recovered,
    todayCases,
    todayDeaths,
    todayRecovered,
  }) => {
    setState(state);
    setCases(cases);
    setRecovered(recovered);
    setDeaths(deaths);
    setTodayCases(todayCases);
    setDeathCases(todayDeaths);
    setRecoveredCases(todayRecovered);
  };
  
  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = (props) => {
    props.preventDefault();
    fetch(`https://api.covid19india.org/state_district_wise.json${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };
  
  return (
    <div className="covidData">
      <h1>COVID-19 CASES state_district_WISE</h1>
      <div className="covidData__input">
        <form onSubmit={handleSubmit}>
          {/* input State and district name */}
          <input onChange={handleSearch} placeholder="Enter State and district Name" />
          <br />
          <button type="submit">Search</button>
        </form>
      </div>
  
      {/* Showing the details of the state */}
      <div className="covidData__state_district_wise__info">
        <p>state Name : {state} </p>
  
        <p>Cases : {cases}</p>
  
        <p>Deaths : {deaths}</p>
  
        <p>Recovered : {recovered}</p>
  
        <p>Cases Today : {todayCases}</p>
  
        <p>Deaths Today : {deathCases}</p>
  
        <p>Recovered Today : {recoveredCases}</p>
      </div>
    </div>
  );
}
  
export default CovidData;