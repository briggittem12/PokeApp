import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PokemonType = ({pokeType, setPokeType, setSearchPoke}) => {

  const [listTypes, setListTypes] = useState()

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type'
    axios.get(URL)
      .then(res => setListTypes(res.data.results))
      .catch(err => console.log(err))
  }, [])

  const handleChange = e => {
    setPokeType(e.target.value)
    setSearchPoke('')
  }

  return (
    <select value={pokeType} onChange={handleChange}>
      <option value="All">All pokemons</option>
      {
        listTypes?.map(type => (
          <option key={type.name} value={type.name}>{type.name}</option>
        ))
      }
    </select>
  )
}

export default PokemonType