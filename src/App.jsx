import React, { useEffect, useState } from "react";
import { PokeCard } from "./components/PokeCard/PokeCard";
import "./styles.css";
import { REQUEST_STATUS, useFetch } from "./utilities/useFetch";
import { Button } from "@mui/material";
import { Pokebola } from "./components/PokeCard/PokeBola/Pokebola";
import { Loader } from "./components/PokeCard/Loader/Loader";

export const App = () => {
  const [index, setIndex] = useState(0)
  const [pokemons, setPokemons] = useState([])
  
  const { info, status, getData } = useFetch({
    url: `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${20*index}`,
    defaultVal: [],
  });

  useEffect(()=> {   
    getData()
    
  },[index])

  useEffect(()=> {

    if(pokemons.length > 0 && status === REQUEST_STATUS.SUCCESS) {
     
        setPokemons((prev)=> [...prev, ...info ])
         
     
    } else {
      setPokemons(info)
    }

   
  }, [info])

 
 


  const showMorePokemons = ()=> {
    setIndex((i)=> i+1)
   
  }

  return (
    <div className="container">
      <div className="pokemons-container">
        
       
      {status === REQUEST_STATUS.LOADING && index === 0 ? <Loader/> : pokemons.map(pokemon => {
        return <PokeCard name={pokemon.name} img={pokemon.sprites.other.dream_world.front_default} id={pokemon.id} type={pokemon.types[0].type.name}/>
      })}
      </div>
    {status === REQUEST_STATUS.SUCCESS && <Button variant="outlined" onClick={()=> showMorePokemons()}>Show More</Button> }
    {status === REQUEST_STATUS.LOADING && index > 0 && <Pokebola/>}
    
    </div>
  );
};
