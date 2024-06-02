import { Avatar, IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import axios from 'axios'
import { WishlistContext } from '../../../Context/WishlistContext'
import { CartContext } from '../../../Context/CartContext'
import { OrderContext } from '../../../Context/OrderContext'
import { AuthContext } from '../../../Context/AuthContext'
export const Profile = () => {
  const {countwishlist} =useContext(WishlistContext)
  const {count} =useContext(CartContext)
  const {orderssCount,addedorder,setaddedorder} =useContext(OrderContext)
  const {client,setclient,user_db, setuser_db} =useContext(AuthContext)
  const [srcImg, setSrcImg] = useState(null);
  const id = localStorage.getItem('id_active');


  const [clientData, setClientdata] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    user_id: id
  });

  console.log(clientData)

const getClients = () => {
      axios.get(`http://127.0.0.1:8000/api/client?id=${id}`)
     .then(response => {
       setClientdata(response.data.clientdata);   
       setclient(clientData)     
       console.log(response);
     })
     .catch(error => {
         console.error(error);
     });
};


useEffect(()=>{
  getClients()
},[])


const handleSubmit = (e) => {
  console.log(clientData)
  e.preventDefault();
  axios.put('http://127.0.0.1:8000/api/client', clientData)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
      alert('Error updating profile');
    });
};

console.log(clientData)

  return (
    <div >
        <div className='cardprofileinfo'>
      
{clientData ? 
  <div class="cardprofile">
    <div class="infos">
        <div class="image">
          <img src={`http://localhost:8000/api/profile-image/?id=${id}`}  />
        </div>
        <div class="info">
       <div className='infotop'>
       <p class="infonameclient">
                   {clientData.firstname} {clientData.lastname}
               </p>
              <div className='infoclient'>
                <div>
                <p>Phone</p>
              <p >
                  {clientData.phone}
               </p>
                </div>
                <div>
                <p>Email</p>
              <p >
                  {clientData.email}
               </p>
                </div>
                <div>
                <p>City</p>
              <p >
                  {clientData.city}
               </p>
                </div>
              </div>
       </div>
          
        </div>
          
    </div>

</div> : ""}
<div className='cardsdetailclient'>
<div className='profiledetailinfo'>
        <p className='number'>{countwishlist}</p> 
        <p>Items in wishlist</p> 
       </div>
       <div className='profiledetailinfo'>
        <p className='number'>{orderssCount}</p> 
        <p>All orders</p> 
       </div>
       <div className='profiledetailinfo'>
        <p className='number'>{count}</p> 
        <p>Items in bag</p> 
       </div>
</div>
        </div>

   <div>
    
   <div className='clientinformation'>

 <form  onSubmit={handleSubmit} className='formProfile'>
 
    
   <table className='table-form-client'>
       <tr className='tr-form-client'>
           <td className='td-form-client'>
              
                   <input
                       type="text"
                       className="input"
                       value={clientData.firstname}
                       onChange={(e) => setClientdata({ ...clientData, firstname: e.target.value })}
                   />
           </td>
           <td className='td-form-client'>
             
                   <input
                   className="input"
                       type="text"
                       value={clientData.phone}
                       onChange={(e) => setClientdata({ ...clientData, phone: e.target.value })}
                   />
           </td>
       </tr>
       <tr className='tr-form-client'>
           <td className='td-form-client'>
              
                   <input
                   className="input"
                       type="text"
                       value={clientData.lastname}
                       onChange={(e) => setClientdata({ ...clientData, lastname: e.target.value })}
                   />
           </td>
           <td className='td-form-client'>
              
                   <input
                   readOnly
                   disa
                   className="input"
                       type="email"
                       value={clientData.email}
                       onChange={(e) => setClientdata({ ...clientData, email: e.target.value })}
                   />
           </td>
       </tr>
       <tr className='tr-form-client'>
           <td className='td-form-client'>
              
                   <input
                  
                   className="input city"
                       type="text"
                       value={clientData.city}
                       onChange={(e) => setClientdata({ ...clientData, city: e.target.value })}
                   />
           </td>
           
           <td className='td-form-client'>
               
                   <input
                   className="input"
                       type="text"
                       value={clientData.address}
                       onChange={(e) => setClientdata({ ...clientData, address: e.target.value })}
                   />
           </td>
       </tr>

       <button type='submit' className='btneditprofile'>Edit</button>
   </table>
   </form>

</div>

   </div>

    </div>
  )
}
