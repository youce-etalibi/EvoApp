import React, { useContext, useEffect, useState } from 'react'
import './Reviews.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import { CartContext } from '../../../Context/CartContext'
import { AuthContext } from '../../../Context/AuthContext'

export const Reviews = ({idprod,reviews}) => {

  const {addedreview,setaddedreview} =useContext(CartContext)
  const {user_id} =useContext(AuthContext)
   

  const [formData, setFormData] = useState({
    user_id: user_id,
    product_id: idprod,
    username: '',
    email: '',
    message: '',
    rating: 0,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };
    const handleRatingChange = (selectedRating) => {
    setFormData({ ...formData, rating: selectedRating });
  };


  const validateForm = () => {
    const validationErrors = {};

    if (formData.username.trim() === '') {
      validationErrors.username = "Username required";
    } else if (/\d/.test(formData.username)) {
      validationErrors.username = "Invalid";
    }

    if (formData.email.trim() === '') {
      validationErrors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Invalid";
    }

    if (formData.message.trim() === '') {
      validationErrors.message = "Message required";
    }

    if (formData.rating === 0) {
      validationErrors.rating = "Rating required";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const AddReview = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    axios.post('http://127.0.0.1:8000/api/AddReview', formData)
      .then(response => {
        console.log(response.data);
        setaddedreview(!addedreview)
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  return (
    <div>
      {reviews.map((rev)=>(

        <div className='review'>
        <div className='profile'>
        </div>
        
            <div className='reviwecontent'>
              <div className='reviewhead'>
              <h3>{rev.username}</h3>
              <h5>
              {[...Array(5)].map((star, index) => (
                <i
                  key={index}
                  className='bx bxs-star'
                  style={{ color: index < rev.rating ? 'red' : 'gray' }}
                ></i>
              ))}
            </h5>
              </div>
               <p>{rev.message}</p>
            </div>

        </div>
      ))}

        <form onSubmit={AddReview} className='formreview'>
        <fieldset className='fieldset'>
        <legend>Make a review</legend>
            <div className='inputsreview'>
            <div>
              <input onChange={handleChange} name='username' className="input" type='text' placeholder="Your name" />
            </div>
            <div>
              <input onChange={handleChange} name='email' className="input" type='text' placeholder="Email" />
            </div>
            </div>

            <div className='inputsmessage'>
              <input onChange={handleChange} name='message' className="input" type='text' placeholder="Your message" />
            </div>
           <div className='bottomreviwe'>
           <div>
              <span>Your rating :</span>
              {[1, 2, 3, 4, 5].map((value) => (
                <i key={value} className={`bx ${value <= formData.rating ? 'bxs-star' : 'bx-star'}`} onClick={() => handleRatingChange(value)}></i>
              ))}
              {errors.rating && <span className="error">{errors.rating}</span>}
            </div>

            <div>
              <button  className='buttonReview'>Post Review</button>
            </div>

           </div>
        </fieldset>
        </form>
    </div>
  )
}
