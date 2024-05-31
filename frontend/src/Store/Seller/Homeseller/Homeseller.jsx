import React, { useContext, useEffect, useState } from 'react'
import './Homeseller.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const HomeSeller = () => {

  const nav =useNavigate()

  const handleseller = () =>{
    nav('/store')
  }


  return (
  <div className='homeseller'>

  <Link to="/store/seller/profileseller">Dashboard</Link>
  <button onClick={handleseller}>Go to espace client</button>
  </div>
  )
}
