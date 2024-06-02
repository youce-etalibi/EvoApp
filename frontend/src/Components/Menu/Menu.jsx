import React, { useContext } from 'react'
import './Menu.css'
import { MenuContext } from '../../Context/MenuContext'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
export const Menu = () => {
    const {isactive,setisactive} =useContext(MenuContext)
    
    const handleactive = () => {
      setisactive(!isactive);
  };

  return (
    <div className='menuParent'>
   <IconButton  id='menuDrop'>
    <i onClick={handleactive} class='bx bx-menu' ></i>
   </IconButton>
    
       {isactive &&
       <ul className='listIcons'>
        <Link to="/home">
        <li>
            <img src="/Icons/icon4.svg" alt="" />
            <p>Home</p>
        </li>
        </Link>
        <Link to="/CaloriesCalculator">
        <li>
            <img src="/Icons/icon1.svg" alt="" />
            <p>Calculatore</p>
        </li>
        </Link>
        <Link to="/Store">
        <li>
            <img src="/Icons/icon2.svg" alt="" />
            <p>Store</p>
        </li>
        </Link>
        <Link to="/exercices/overview">
        <li>
            <img src="/Icons/icon3.svg" alt="" />
            <p>Exercises</p>
        </li>
        </Link>
      
       </ul>
       }
        </div>
  )
}