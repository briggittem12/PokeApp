import React from 'react'

const PokemonCard = () => {
  const [pokemon, setPokemon] = useState()

    useEffect(() => {
        axios.get(url)
        .then(res => setPokemon(res.data))
        .catch(err => console.log(err))
    }, [])

    console.log(pokemon)
  return (
    <article>
      <header>
        <img src={pokemon?.sprites.other["official-artwork"]["front_default"]} alt="" />
      </header>
      <section>
        <h3>{pokemon?.name}</h3>
        <ul>
          {
            pokemon?.types.map(slot => (
              <li key={slot.type.url}>{slot.type.name}</li>
            ))
          }
        </ul>
      </section>
      <footer>
        <ul>
          {
            pokemon?.stats.map(cont => (
              <PokeSta
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