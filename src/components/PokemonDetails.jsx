import React from 'react'
import { useParams } from 'react-router-dom'

const PokemonDetails = () => {

  let {name} = useParams()
  return (
    <h1>{name}</h1>
  )
}

export default PokemonDetails