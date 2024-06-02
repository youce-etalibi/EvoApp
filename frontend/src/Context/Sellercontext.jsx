import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const SellerContext = createContext()

 export const SellerProvider = ({children}) => {

    const seller_id = localStorage.getItem('seller_id');

     const [seller,Setseller]=useState({})
     const [addprod,setaddprod]=useState(false)
     const [editprod,seteditprod]=useState(false)
     const [deleteprod,setdeletprod]=useState(false)
     const [sellerisauth, setsellerisauth] = useState(false);


     useEffect(() => {

        getseller();
    }, [sellerisauth]);
    
    
    const getseller = () => {
      axios.get(`http://127.0.0.1:8000/api/getseller?id=${seller_id}`)
      .then(response => {
                Setseller(response.data.seller)
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    };
    console.log(seller)
    console.log(seller_id)
     return (

    <SellerContext.Provider value={{seller,Setseller,addprod,setaddprod,editprod,seteditprod,deleteprod,setdeletprod}}>
     {children}
    </SellerContext.Provider>
    
  )
}