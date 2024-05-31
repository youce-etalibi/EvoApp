import React from 'react'
import { Section1 } from './Section1/Section1'
import { Collection } from './Collections/Collection'
import { Essentiel } from './Essentiel/Essentiel'
import { Home } from './Home/Home'
import { Navbar } from './Navbar/Navbar'
import { Footer } from './Footer/Footer'

export const Storeparent = () => {
  
  return (

    <div >
        <Navbar />
        <Home />
        <Section1 />
        <Collection />
        <Essentiel />
        <Footer />
    </div>
  )
}
