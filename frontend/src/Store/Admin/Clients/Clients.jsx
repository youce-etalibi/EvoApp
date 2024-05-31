import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { AdminContext } from '../../../Context/AdminContext'
import { Updateclient } from './Updateclient'

export const Clients = () => {

    const [ToggleAddCat,setToggleAddCat] =useState(false)
    const [ToggleEditCat,setToggleEditCat] =useState(false)
    const [Toggledeletcat,setToggledeletcat] =useState(false)
    const [clientId, setclientId] = useState(null);
 
  const  {setisdelete,isdelete,isedit,isadd} =useContext(AdminContext)

    const [clients,setclients]=useState([])
    
  const getclients = () => {
    axios.get(`http://127.0.0.1:8000/api/getclients`)
   .then(response => {
     setclients(response.data.clients);        
     console.log(response)
   })
   .catch(error => {
       console.error(error);
   })
  }
  
  useEffect(()=>{
    getclients()
  },[isedit,isadd,isdelete])


  function openAddProducts() {
    setToggleAddCat(true);
}
function closeopenAddProducts() {
    setToggleAddCat(false);
}

    const openEditproducts = (id)=> {
        setclientId(id);
        setToggleEditCat(true);
    }
    function closeEditproduct() {
        setToggleEditCat(false);
    }


    const deleteclient = async (id) => {
        try {
        const res=   await axios.delete(`http://127.0.0.1:8000/api/client/${id}`);
          console.log(res)
          setisdelete(!isdelete)
        } catch (error) {
          console.error('Error deleting the product:', error);
        }
      };

    return (
        <div id='productStoreseller'>
   
<section className="containertable">
  <table className="order-table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Balance</th>
        <th>Order No</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {clients.map((client)=>(
          <tr>
        <td> {client.id}</td>
        <td>{client.phone}</td>
        <td>{client.email}</td>
        <td>$33</td>
        <td>{client.orders_count}</td>
        <td>
                        <div className='quantityseller'>
                            <button className="" onClick={() => deleteclient(client.id)}>
                                <IconButton  aria-label="hide">
                                    <span className="span"><i class='bx bx-trash' ></i></span>
                                </IconButton>
                            </button>
                            <button className="" onClick={() => openEditproducts(client.id)}>
                                <IconButton  aria-label="hide">
                                    <span className="span"><i class='bx bxs-edit-alt'></i></span>
                                </IconButton>
                            </button>
                        </div>
                    </td>
      </tr>
    ))}
    </tbody>
  </table>
</section>


    {/* {ToggleAddCat && <Addtype onClose={closeopenAddProducts} />} */}
        {ToggleEditCat && <Updateclient clientId={clientId} onClose={closeEditproduct} />}

        </div>
      
  )
}
