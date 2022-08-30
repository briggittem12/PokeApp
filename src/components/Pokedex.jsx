import axios from 'axios'
import React, { useEffect, useState } from 'react'
import nameTrainer from '../store/slices/nameTrainer.slice'
import Pagination from "./Pokedex/Pagination";
import PokemonCard from './Pokedex/PokemonCard'
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
  useEffect(() => {
    if(searchPoke){
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
  }, [offset, searchPoke])

  const allPokemons = pokemons?.count;

  let capSearch = e => {
    e.preventDefault()
    setSearchPoke(e.target.findPoke.value.trim())
  }

  //Selec type baddd
  const [pokeType, setPokeType] = useState()

   useEffect(()=>{
    const url = 'https://pokeapi.co/api/v2/type/'
    axios.get(url)
        .then(res => setPokeType(res.data.results))
        .catch(err => console.log(err))
    },[])

  const changeSubmit = e  => {
    setPokeType(e.target.value)
    }



  return (
    <div className='card__body'>
      <div className='poke__title'>
      <h1>Pokedex Academlo</h1>
      <span className='poke__trainer'>Welcome, {trainerName}</span>
      </div>
      <div className='cards_form'>
          <form className='search' onSubmit={capSearch}>
            <input  className='form_search' id='findPoke' placeholder='Name...' type="text" />
            <button className='search_btn'>Search</button>
          </form>

          <form onChange={changeSubmit} >
            <select>
            <option value="All">All Pokemon's</option>
              {
                pokeType?.map(type => (
                <option key={type.name} value={type.name}>{type?.name}</option>
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