import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

export const WishlistContext = createContext()

 export const WishlistProvider = ({children}) => {

  const [deletedItemwishlist,setdeletedItemwishlist]=useState(false)
  const [addedtowishlist,setaddedtowishlist]=useState(false)
  const [countwishlist,setcountwishlist]=useState(0)
  const id = localStorage.getItem('id_active');
  const {userisauth} =useContext(AuthContext)

  const [wishlist, setwishlist] = useState([])
  useEffect(() => {
    fetchwishlist();
  }, [addedtowishlist,deletedItemwishlist,id,userisauth]);


  const fetchwishlist = () => {
      axios.get(`http://127.0.0.1:8000/api/getwishlist?id=${id}`)
      .then(response => {
        setwishlist(response.data.wishlist);
        setcountwishlist(response.data.count)
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (

    <WishlistContext.Provider value={{
      deletedItemwishlist,
      setdeletedItemwishlist,
    addedtowishlist
    ,setaddedtowishlist
    ,countwishlist,setcountwishlist, 
    wishlist,setwishlist, 
    }}>
     {children}
    </WishlistContext.Provider>
    
  )
}
