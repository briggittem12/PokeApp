import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios' 
import './styles/pokedetll.css'

const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState()

  let {name } = useParams()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => setPokemon(res.data))
        .catch(err => console.log(err))
    }, [])

  return (
    <article className={`poke_uni bg-${pokemon?.types[0].type.name}`}>
      <h1>{ name }</h1>
      <div>
        <img src={pokemon?.sprites.other["official-artwork"]["front_default"]} alt={pokemon?.name} />
      </div>
      <div >
        <ul className='poke_control'>
          <p>Type:</p>
        {
          pokemon?.types.map(slot => (
            <li key={slot.type.url}>{slot.type.name}</li>
            ))
          }
          <p>Stats:</p>
        {
          pokemon?.stats.map(cont => (
            <p key={cont.stat.url}>
              {cont.stat.name}{cont.base_stat}
            </p>
            ))
          }
          </ul>  
        </div>

    </article>
    
  )
}

export default PokemonDetails