import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const OrderContext = createContext()

 export const OrderProvider = ({children}) => {

  const [orderss,setorderss] =useState([])
  const [orderssCount,setorderssCount]=useState(0)
  const [addedorder,setaddedorder]=useState(false)
  const id = localStorage.getItem('id_active');
  
  const getOrderrs = () => {
    axios.get(`http://127.0.0.1:8000/api/getOrderrs?id=${id}`)
        .then(response => {
            const formattedOrders = response.data.orderss.map(order => ({
                ...order,
                created_at: new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            }));
            setorderss(formattedOrders);
            setorderssCount(response.data.orderssCount)
            console.log(formattedOrders);
        })
        .catch(error => {
            console.error(error);
        });
};

useEffect(() => {
    getOrderrs();
}, [addedorder]);



  return (

    <OrderContext.Provider value={{
    orderssCount,setorderssCount,
    orderss,setorderss,
    addedorder,
    setaddedorder,
    }}>
     {children}
    </OrderContext.Provider>
    
  )
}
