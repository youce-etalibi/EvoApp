import React, { useContext } from 'react'
import {Sidebar} from './SideBar/Sidebar'
import { Outlet, useLocation } from 'react-router'
import './Dashboard.css'
import { Profile } from './Profile/Profile'
import { AuthContext } from '../../Context/AuthContext'
import { Orders } from './Orders/Orders'
export const Dashboard = () => {
  const location = useLocation();
  const {user_db} =useContext(AuthContext)
 console.log(user_db.client)
  // Check if the pathname is '/store/profile'
  const isStoreProfile = location.pathname === '/store/profile';
  return (
    <div className='dashboardUser'>
        <Sidebar />
            <div className='dashboard-content'>
            {isStoreProfile ?
             user_db.client ? <Profile /> : <Orders />
             :
             <Outlet /> } 
                </div>
    </div>
  )
}
