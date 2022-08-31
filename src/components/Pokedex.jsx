import axios from 'axios'
import React, { useEffect, useState } from 'react'
import nameTrainer from '../store/slices/nameTrainer.slice'
import Pagination from "./Pokedex/Pagination";
import PokemonCard from './Pokedex/PokemonCard'
import PokemonType from './Pokedex/PokemonType';
import { useSelector } from 'react-redux/es/exports'
import './styles/headpoke.css'

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
      <header className='red-head'>
      <h1>Pokedex</h1>
        <div className='black-head'></div>
        <div className='circle-head'>
          <div className='circle-in'></div>
        </div>
      </header>
      <div className='poke__title'>
      <span className='poke__trainer'>Welcome, {trainerName}</span>
      </div>
      <div className='cards_form'>
          <form className='search' onSubmit={capSearch}>
            <input  className='form_search' id='findPoke' placeholder='Name...' type="text" />
            <button className='search_btn'>Search</button>
          </form>
          <form>
          <PokemonType 
            pokeType={pokeType} 
            setPokeType={setPokeType} 
            setSearchPoke={setSearchPoke}
            />
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