import React, { useContext } from 'react'
import './Menu.css'
import { MenuContext } from '../../Context/MenuContext'
export const Menu = () => {
    const {isactive,setisactive} =useContext(MenuContext)
  return (
    <div className='menu'>
       {isactive &&
       <ul className='listIcons'>
        <li>
            <img src="/Icons/icon1.svg" alt="" />
        </li>
        <li>
            <img src="/Icons/icon2.svg" alt="" />
        </li>
        <li>
            <img src="/Icons/icon3.svg" alt="" />
        </li>
        <li>
            <img src="/Icons/icon4.svg" alt="" />
        </li>
       </ul>
       }
        </div>
  )
}
