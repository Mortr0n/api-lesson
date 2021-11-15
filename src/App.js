import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [planet, setPlanet] = useState({});
  const [planetNumber, setPlanetNumber] = useState(1);
  const [inhabitants, setInhabitants] = useState({});
  const [inhabitantsLink, setInhabitantsLink] = useState([]);
  const [toggle, setToggle] = useState(false);



  useEffect(() => {
    // using backticks `` in order to concatenate javascript string and javascript variables
    fetch(`https://swapi.dev/api/planets/${planetNumber}`)
      .then((res) => {
        console.log(res)
        return res.json();
      })
      .then((res)=>{
        console.log(res)
        setPlanet(res);
        console.log(res.residents);
        // setting this for the useEffect below to get an inhabitant
        setInhabitantsLink(res.residents);
      })
      .catch((err)=>console.log(err))
      // refresh component on planetNumber change
  }, [planetNumber]);

  useEffect(()=>{
    if(inhabitantsLink[0]){
      // only getting the first inhabitant not the whole array
      fetch(inhabitantsLink[0])
      .then((res) =>{
        return res.json();
      })
      .then((res)=>{
        console.log(res);
        setInhabitants(res);
      })
      .catch((err)=>console.log(err));
    }
    // refresh component every time the inhabitants link changes
  }, [inhabitantsLink]);


  
  const nextPlanet = (e) => {
    // if we get to the last planet in the api start back at beginning
    if(planetNumber>=60) {
      setPlanetNumber(1);
    }else{
      setPlanetNumber(planetNumber + 1);
    }
  }

  const previousPlanet = (e) => {
    if(planetNumber<=1){
      setPlanetNumber(60);
    }else{
      setPlanetNumber(planetNumber - 1);
    }
  }



  return (
    <div className="App">
          <h1>Star Wars Planets</h1>
          <h2>Planet Name : {planet.name}</h2>
          {/* checking via ternary to see if anyone is actually on the planet via button
          otherwise it will just post someone from the last planet*/}
          {
            toggle && planet.residents.length>0? 
            <h2>Famous Resident: {inhabitants.name}</h2> :
            <h2>This place is a ghost town!</h2>
          }
          
          <h3>Climate : {planet.climate}</h3>
          <h3>Population : {planet.population}</h3>
          <h3>Surface Water : ~{planet.surface_water}%</h3>
          <h3>Terrain : {planet.terrain}</h3>
          <button onClick={(e) => setToggle(!toggle)}>Get a famous person</button>
          <button onClick={previousPlanet}>Previous Planet</button>
          <button onClick={nextPlanet}>Next Planet</button>


    </div>
  );
}

export default App;
