import React, { useState, useEffect, useContext } from 'react';
import { SellerContext } from '../../../../Context/Sellercontext';
import axios from 'axios';

const Cardprofile = () => {
    const {seller}=useContext(SellerContext)
    
    const [isEditing,setisEditing] =useState(false)


    const [sellerData, setsellerData] = useState({
      id: seller.id,
      nameseller: seller.nameseller,
      emailseller:seller.emailseller,
      phoneseller:seller.phoneseller,
      user_id:seller.usr_id,
    });
  
    console.log(sellerData)
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://127.0.0.1:8000/api/seller', sellerData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
        alert('Error updating seller');
      });
  };
  

  const editContent = () => {
    setisEditing(!isEditing);
  };



  return (
    <div>
        {isEditing ?
        <div className='card-edit-seller'>

   <div>
    <input type="text"  value={sellerData.nameseller}
                       onChange={(e) => setsellerData({ ...sellerData, nameseller: e.target.value })} />
   </div> 
   <div>
    <input type="text" readOnly hidden  value={sellerData.emailseller}
                       onChange={(e) => setsellerData({ ...sellerData, emailseller: e.target.value })} />
   </div> 
   <div>
    <input type="text"  value={sellerData.phoneseller}
                       onChange={(e) => setsellerData({ ...sellerData, phoneseller: e.target.value })} />
   </div> 
   <button onClick={handleSubmit}>save</button>

   </div> 
   : 
   <div className='card-open-seller'>
  <p>{seller.nameseller}</p>
     <p>{seller.emailseller}</p>
     <p>{seller.phoneseller}</p>
   <button onClick={editContent}>edit</button>
    </div>
   }

    </div>
  );
};

export default Cardprofile;
