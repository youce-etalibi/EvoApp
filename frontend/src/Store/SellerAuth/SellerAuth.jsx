import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
export const SellerAuth = () => {
  
  return (
    <div className='seller-auth'>
       <Link to='/store'>
         <img className='logoimage' src="/Evolution.png" alt="Evolution" title="Evolution" />
     </Link>
        <Outlet />
    </div>
  )
}
