import React from 'react'
import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';
import { SellerContext } from '../../../Context/Sellercontext';
export const Header = () => {
    const {seller,Setseller}=useContext(SellerContext)
    const [anchorEl, setAnchorEl] = useState(null);
  
   const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const navigate = useNavigate();
  
    const handleLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/logoutseller', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('seller_token')}`
                }
            });
            localStorage.removeItem('seller_token');
            localStorage.removeItem('seller_id');
            localStorage.removeItem('isSeller');
            navigate('/store');
        } catch (error) {
            console.error("Error logging out:", error);
            // Handle error appropriately, for example, display a message to the user.
        }
    }
    
  
  return (
    <div>
         <header className="sellerHeader">
         <Link to="/store/seller">
         <img src="/EvolutionLogoCalculator.svg" alt="Evolution" title="Evolution" />
         </Link>
         <div className='linksseller'>
      
      <Link to="/store/">
      <li>Espace Client</li>
      </Link>
      <Link to="/store/seller/profileSeller">
      <li>Dashboard</li>
      </Link>
      <li>

      <MenuItem className="menuItem" onClick={handleLogout}>
        Log out  
        </MenuItem>
        
      </li>
      </div>
        <div className='sellerlinkTele'>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <IconButton
              onClick={handleClick}
              size="small"
              sx={{p:1}}
            >
                <Avatar sx={{ width: 35, height: 35 }}>
                  {/* {seller && seller.nameseller.charAt(0).toUpperCase()} */}
                </Avatar>
            </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
          <Link to='/store/seller/profileseller' className='itemprofile'>
        <MenuItem onClick={handleClose}>
  <>
   <Avatar sx={{ width: 35, height: 35, mr: 1 }}>
   </Avatar>
    {seller && seller.nameseller}
  </>
        
        </MenuItem>
        <MenuItem >
       <Link to="/store">
       Espace client       </Link> 
        </MenuItem>
        <MenuItem onClick={handleLogout}>
        Log out  
        </MenuItem>
        </Link>
      </Menu>
        </div>
        </header>
    </div>
  )
}

        