import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { AdminContext } from '../../../Context/AdminContext'


export const Orderss = () => {

  const  {setisdelete,isdelete,isedit,isadd} =useContext(AdminContext)

    const [orderss,setorderss]=useState([])
    
  const getOrderrs = () => {
    axios.get(`http://127.0.0.1:8000/api/getOrderrsAdmin`)
   .then(response => {
     setorderss(response.data.orderss);        
     console.log(response)
   })
   .catch(error => {
       console.error(error);
   })
  }
  
  useEffect(()=>{
    getOrderrs()
  },[isedit,isadd,isdelete])


    const deleteorder = async (id) => {
        try {
        const res=   await axios.delete(`http://127.0.0.1:8000/api/deleteorder/${id}`);
          console.log(res)
          setisdelete(!isdelete)
        } catch (error) {
          console.error('Error deleting the order:', error);
        }
      };

    return (
     
        <div id='productStoreseller'>
   
<section className="containertable" >
  <table className="order-table">
    <thead>
      <tr>
        <th>OrderId</th>
        <th>Customer</th>
        <th>Billing Adress</th>
        <th>Expected_date</th>
        <th>total_amount</th>
        <th>Action</th>

      </tr>
    </thead>
    <tbody>
      {orderss.map((ord)=>(
          <tr>
        <td> #{ord.id}</td>
        <td>{ord.client && ord.client.firstname}</td>
        <td>{ord.client && ord.client.address}</td>
        <td>{ord.expected_delivery_date}</td>
        <td>${ord.total_amount}</td>
        <td>
                        <div className='quantityseller'>
                            <button className="" onClick={() => deleteorder(ord.id)}>
                                <IconButton  aria-label="hide">
                                    <span className="span"><i class='bx bx-trash' ></i></span>
                                </IconButton>
                            </button>
                        </div>
                    </td>
      </tr>
    ))}
    </tbody>
  </table>
</section>

        </div>
      
  )
}
