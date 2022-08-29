import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PokemonCard from './Pokedex/PokemonCard'

const Pokedex = () => {

  const [pokemons, setPokemons] = useState()

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/pokemon'
    axios.get(URL)
      .then(res => setPokemons(res.data))
      .catch(err => console.log(err))
  }, [])

  const [PokeType, setPokeType] = useState()

   useEffect(()=>{
    const url = "https://pokeapi.co/api/v2/type/"
    axios.get(url)
        .then(res => setPokeType(res.data.results))
        .catch(err => console.log(err))
    },[])

  const changeSubmit = (e = 1) => {

    if (e === ""){

    } else {

        const type = e.target.value
    
        console.log(e.target.value)

        const url = `https://pokeapi.co/api/v2/type/${type}/`

        axios.get(url)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

    }
}

  return (
    <div>
      <h1>Pokedex Academlo</h1>
      <div>
          <form>
            <input placeholder='Name...' type="text" />
            <button>Search</button>
          </form>

          <form onChange={changeSubmit} >
            <select>
            <option key={0} value=""></option>
              {
                PokeType?.map((type,i) => (
                <option key={i} value={i + 1}>{type?.name}</option>
                ))
              }
            </select>
          </form>
        </div>
      <div className='cards-container'>
        {
          pokemons?.results.map(pokemon => (
            <PokemonCard 
              key={pokemon.url}
              url={pokemon.url}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Pokedex