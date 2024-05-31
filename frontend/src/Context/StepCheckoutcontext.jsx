import React, { createContext, useState } from 'react'

export const StepCheckoutcontent = createContext()

 export const StepsProvider = ({children}) => {

    const [Interface,setinterface] = useState('carttable')
    const [maindetail,setmaindetail] = useState('description')

  return (

    <StepCheckoutcontent.Provider value={{Interface,setinterface,maindetail,setmaindetail}}>
     {children}
    </StepCheckoutcontent.Provider>
    
  )
}
