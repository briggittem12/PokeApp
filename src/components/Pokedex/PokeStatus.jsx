import React from 'react'

const PokeStatus = ({infoState}) => {

  return (
    <li>
        <h4>{infoState.stat.name}</h4>
        <p>{infoState.base_stat}</p>
    </li>
  )
}

export default PokeStatus