import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router';
import axios from 'axios';
import '../SellerAuth.css'
import { Link } from 'react-router-dom';
import { Alert } from '@mui/material';
export const Register = () => {
    const userId = localStorage.getItem('id_active');
    const [messageError,setmessageError]=useState('')
    const nav = useNavigate()
      const [formData,setformData] = useState({
        name: '',
        email: '',
        phone: '',
        usr_id: userId,
       })
      const [Errors,setErrors] = useState({})
      
      const handleChange = (e) => {
        setformData({...formData,[e.target.name] : e.target.value})
        setErrors({ ...Errors, [e.target.name]: '' });
    
    }
    
    const validateForm = () => {
      const validationErrors = {};
    
      if (formData.name.trim() === '') {
          validationErrors.name = "Name required";
      }else if (/\d/.test(formData.name)) {
        validationErrors.name = "invalide";
      }
      if (formData.email.trim() === '') {
          validationErrors.email = "email required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "invalid";
      }
    
      if (formData.phone.trim() === '') {
          validationErrors.phone = "phone required";
      } 
     
      setErrors(validationErrors);
    
      return Object.keys(validationErrors).length === 0;
    };
    
    const AddSeller = (e) => {
    e.preventDefault()
     
    if (!validateForm()) {
          
        return; 
    }
    const isFormValid = validateForm();
     
      axios.post('http://127.0.0.1:8000/api/AddSeller', formData)
          .then(response => {
              console.log(response);
              const token = response.data.token;
              const  sellerid = response.data.seller_id
              localStorage.setItem('seller_id', sellerid);
              localStorage.setItem('seller_token', token);
              localStorage.setItem('isSeller', true);
               nav('/store/package')
  
          })
          .catch(error => {
              console.error(error);
              setmessageError(error.response.data.error);
          });
    };
    
    
  return (
    <>
    <form onSubmit={AddSeller} className='formseller'>
      <h2>Create Seller Account</h2>
      <input  name='usr_id' hidden />
      <input onChange={handleChange} className="input"  name='name' type='text' placeholder="Firstname" />
      {Errors.firstname && <span className='errorMessage'>{Errors.name} <i className='bx bxs-error'></i></span>} 
   
      <input   onChange={handleChange} className="input" name='email' type='text' placeholder="Email" />
      {Errors.email && <span className='errorMessage'>{Errors.email} <i className='bx bxs-error'></i></span>} 
    
   
      <input   onChange={handleChange} className="input"  name='phone' type='text' placeholder="Phone Number" />
      {Errors.phone && <span className='errorMessage'>{Errors.phone} <i className='bx bxs-error'></i></span>} 
    
      <div>
   <button type='submit' className='btn-authseller'>submit</button>
    <Link to='/store/seller-auth/login'>Login</Link>
   </div>
</form>
{messageError && <Alert className='msgalertlogin' severity="error">{messageError}</Alert>}

</>

  )
}
