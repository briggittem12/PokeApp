import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios' 

const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState()

  let {name } = useParams()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => setPokemon(res.data))
        .catch(err => console.log(err))
    }, [])

  return (
    <article>
      <h1>{name}</h1>
      
    </article>
    
  )
}

export default PokemonDetails