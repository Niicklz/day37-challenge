import React, { useEffect, useState } from 'react'
import "./Pokecard.css"

export const PokeCard = ({name, type, img, id }) => {






  return (
    <div className={`pokecard-container ${type}`}>
        <figure className='pokeimg'><img src={img} alt=""  loading='lazy'/></figure>
        <span className="id">#{id}</span>
        <p className="pokename">{name}</p>
        <p className="type">Type: {type}</p>
    </div>
  )
}
