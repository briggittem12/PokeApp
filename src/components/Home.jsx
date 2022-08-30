import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'

const Home = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const inputValue = e.target.name.value.trim()

    if(inputValue.length !== 0) {
      dispatch(setNameTrainer(inputValue))
      navigate('/pokedex')
    }
    e.target.name.value = ""
  }


  return (
    <div className='home_init'>
      <h1>Hi Trainer!</h1>
      <p>To Start give me your trainer name</p>
      <form className='form__home' onSubmit={handleSubmit}>
        <input className='home_input' id='name' type="text" placeholder='Introduce your name'/>
        <button className='home_btn'>Catch them all</button>
      </form>
    </div>
  )
}

export default Home