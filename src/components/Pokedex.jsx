import axios from 'axios'
import React, { useEffect, useState } from 'react'
import nameTrainer from '../store/slices/nameTrainer.slice'
import Pagination from "./Pokedex/Pagination";
import PokemonCard from './Pokedex/PokemonCard'
import PokemonType from './Pokedex/PokemonType';
import { useSelector } from 'react-redux/es/exports'

const Pokedex = () => {

  const [pokemons, setPokemons] = useState()

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);

  let trainerName = useSelector(state => state.nameTrainer)

   useEffect(() => {
     const URL = 'https://pokeapi.co/api/v2/pokemon'
     axios.get(URL)
       .then(res => setPokemons(res.data))
       .catch(err => console.log(err))
   }, [])


  //search idk
  
  const [searchPoke, setSearchPoke] = useState()
  const [pokeType, setPokeType] = useState()

  useEffect(() => {
    if(pokeType !== 'All'){
      const URL = `https://pokeapi.co/api/v2/type/${pokeType}/`
      axios.get(URL)
        .then(res => {
          const arr = res.data.pokemon.map(e => e.pokemon)
          setPokemons({results: arr})
        })
        .catch(err => console.log(err))
    } else if(searchPoke){
      
      let url = `https://pokeapi.co/api/v2/pokemon/${searchPoke}`

      let find = {
        results: [
          {
            url
          }
        ]
      } 
      setPokemons(find)
    } else {
      const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
      axios.get(URL)
      .then(res => setPokemons(res.data))
      .catch(err => console.log(err))
    }
  }, [offset, searchPoke, pokeType])

  const allPokemons = pokemons?.count;

  let capSearch = e => {
    e.preventDefault()
    setSearchPoke(e.target.findPoke.value.trim().toLowerCase())
    setPokeType("All")
    e.target.findPoke.value = ""
  }

  return (
    <div className='card__body'>
      <div className='poke__title'>
      <h1>Pokedex Academlo</h1>
      <span className='poke__trainer'>Welcome, {trainerName}</span>
      </div>
      <div className='cards_form'>
          <form onSubmit={capSearch}>
            <input id='findPoke' placeholder='Name...' type="text" />
            <button>Search</button>
          </form>

          <PokemonType 
            pokeType={pokeType} 
            setPokeType={setPokeType} 
            setSearchPoke={setSearchPoke}
          />
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
      <div className="pagination">
        <Pagination
          allPokemons={allPokemons}
          offset={offset}
          limit={limit}
          setOffset={setOffset}
          setPokemons={setPokemons}
          setSearchPoke={setSearchPoke}
        />
      </div>
    </div>
  )
}

export default Pokedex