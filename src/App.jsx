import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<LoginPage />}/>

        <Route element={<SignUp />}>
          <Route path=''/>
          <Route path='' />
        </Route>

      </Routes>
    </div>
  )
}

export default App
