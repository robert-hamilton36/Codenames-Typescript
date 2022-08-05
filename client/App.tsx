import React from 'react'

import { Providers } from './Providers'
import { Routes } from './Routes'

const App: React.FC = () => {
  console.log(process.env.apiKey)
  console.log(process.env.authDomain)
  console.log(process.env.projectId)
  console.log(process.env.storageBucket)
  console.log(process.env.messagingSenderId)
  console.log(process.env.appId)
  return (
    <Providers>
      <Routes/>
    </Providers>
  )
}

export default App
