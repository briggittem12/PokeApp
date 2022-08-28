import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<LoginPage/>}/>

        <Route element={}>
          <Route path=''element={}/>
          <Route path='' element={}/>
        </Route>

      </Routes>
    </div>
  )
}

export default App
