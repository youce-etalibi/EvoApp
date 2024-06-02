import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { googleLogout } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../Context/AuthContext';

export default function Profile() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const {setuser_id,user_id,user_db,setuserisauth} =React.useContext(AuthContext)
 console.log(user_db.client)


 const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  React.useEffect(()=>{
    setuserisauth(true)

  },[])
  React.useEffect(()=>{
    const id =  localStorage.getItem('id_active');
    setuser_id(id)
    
  },[])
  const user =  localStorage.getItem('user');
  const token =  localStorage.getItem('token');

  const handleLogout = async () => {

      try {
          axios.post('http://127.0.0.1:8000/api/logout', {}, {
            headers: {
                'Authorization': ` Bearer ${localStorage.getItem('token')} `
            }
        })
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('id_active');
      localStorage.removeItem('seller_id');
      localStorage.removeItem('isSeller');
  

          navigate('/auth/login');
      } catch (error) {
          console.error("Error logging out:", error);
      }
  }



  return (
    <React.Fragment>
 {user_db.client ?
<>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <IconButton
              onClick={handleClick}
              size="small"
              sx={{p:1}}
            >
                <Avatar sx={{ width: 30, height: 30 }}>M</Avatar>
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
          <Link to='/store/profile' className='itemprofile'>
        <MenuItem onClick={handleClose}>
  <>
   <Avatar sx={{ width: 35, height: 35, mr: 1 }}>{user_db.client.firstname.charAt(0).toUpperCase()}</Avatar>
    {user_db.client && user_db.client.firstname}
  </>
        
        </MenuItem>
        </Link>
      </Menu>
</>

      :''
       } 

    </React.Fragment>
  );
}