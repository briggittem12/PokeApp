import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PokeStatus from './PokeStatus'
import PokemonDetails from '../PokemonDetails'
import { useNavigate } from 'react-router-dom'

const PokemonCard = ({url}) => {
  const [pokemon, setPokemon] = useState()


    useEffect(() => {
        axios.get(url)
        .then(res => setPokemon(res.data))
        .catch(err => console.log(err))
    }, [])

    let seePoke = useNavigate()

    let handlePoke = () => seePoke(`/pokedex/${pokemon.id}`)

    //console.log(pokemon)
/*
    Crear objto para el  bg del pokemon 
    let colorBg = {
      fire: 'orange'
    }
*/

  return (

    <article onClick={handlePoke} className='card__structure'>
      <header>
        <img src={pokemon?.sprites.other["official-artwork"]["front_default"]} alt="" />
      </header>
      <section>
        <h3>{pokemon?.name}</h3>
        <ul className='card_content'>
          {
            pokemon?.types.map(slot => (
              <li key={slot.type.url}>{slot.type.name}</li>
            ))
          }
        </ul>
      </section>
      <footer>
        <ul className='card_conte'>
          {
            pokemon?.stats.map(cont => (
              <PokeStatus
              key={cont.stat.url}
              infoState={cont}
              />
            ))
          }
        </ul>
          
      
      </footer>
    </article>
  )
}

export default PokemonCard