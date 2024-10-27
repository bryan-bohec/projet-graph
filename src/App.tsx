import { useState } from 'react'

import './App.css'
import MetroGraph from './components/MetroGraph'
import Test from './components/test'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MetroGraph />
      <Test />
    </>
  )
}

export default App
