import React from 'react'

import { Providers } from './Providers'
import { Routes } from './Routes'

const App: React.FC = () => {
  return (
    <Providers>
      <Routes/>
    </Providers>
  )
}

export default App
