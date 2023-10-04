import { useState } from "react";


export const REQUEST_STATUS = {
    SUCCESS: "success",
    ERROR: "error",
    LOADING: "loading",
    IDLE: "idle",
  };
  
  export const useFetch = ({ url = "", defaultVal }) => {
    const [info, setInfo] = useState(defaultVal);
   
    const [status, setStatus] = useState(REQUEST_STATUS.IDLE);
  
    const getData = async (newUrl) => {
      setStatus(REQUEST_STATUS.LOADING);
  
      try {
        const response = await fetch(newUrl || url); // Usar newUrl si está presente
        const { results } = await response.json();
  
        // Realizar otra petición para obtener más información sobre cada Pokémon
        const pokemonDetails = await Promise.all(
          results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            
            return await response.json();
          })
        );
  

        
        setInfo(pokemonDetails); // Usar pokemonDetails en lugar de results
      
        console.log(pokemonDetails);
        
        setStatus(REQUEST_STATUS.SUCCESS);
      } catch (error) {
        setStatus(REQUEST_STATUS.ERROR);
      }
    };
  
    return {
      info,
      status,
      getData,
    };
  };