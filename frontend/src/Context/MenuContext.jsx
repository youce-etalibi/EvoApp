import React, { createContext, useState } from 'react'

export const MenuContext = createContext()

 export const MenuProvider = ({children}) => {

const [isactive,setisactive]=useState(false)
  
  return (

    <MenuContext.Provider value={{isactive,setisactive}}>
     {children}
    </MenuContext.Provider>
    
  )
}
