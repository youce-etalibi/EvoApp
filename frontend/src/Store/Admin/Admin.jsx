import React, { useEffect } from 'react'
import "./Admin.css"
import { Link, Outlet } from 'react-router-dom';
import {  Products } from './Products/Products';
import { Categories } from './Categories/categories';
import { Types } from './Types/types';
import { ProductsReview } from './Products/ProductsReview';
import { Orderss } from './Orderss/Orderss';
import { Sellers } from './Sellers/Sellers';
import { Package } from './Sellers/Package';
import { Clients } from './Clients/Clients';
import { Users } from './Users/Users';
import SideBar from './SideBar/SideBar';
export const Admin = () => {
    
  return (
   <div>
  <div className="">
      <SideBar />
    <div className="">
      <div className="page-content">
       <Outlet />
      </div>
    </div>
  </div>
</div>

  )
}
