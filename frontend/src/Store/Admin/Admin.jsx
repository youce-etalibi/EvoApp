import React, { useEffect } from 'react'
import "./Admin.css"
import { Link } from 'react-router-dom';
import {  Products } from './Products/Products';
import { Categories } from './Categories/categories';
import { Types } from './Types/types';
import { ProductsReview } from './Products/ProductsReview';
import { Orderss } from './Orderss/Orderss';
import { Sellers } from './Sellers/Sellers';
import { Package } from './Sellers/Package';
import { Clients } from './Clients/Clients';
export const Admin = () => {
    useEffect(()=>{
        let menuButton = document.querySelector(".button-menu");
let containeradmin = document.querySelector(".containeradmin");
let pageContent = document.querySelector(".page-content");
let responsiveBreakpoint = 991;

if (window.innerWidth <= responsiveBreakpoint) {
  containeradmin.classList.add("nav-closed");
}

menuButton.addEventListener("click", function () {
  containeradmin.classList.toggle("nav-closed");
});

pageContent.addEventListener("click", function () {
  if (window.innerWidth <= responsiveBreakpoint) {
    containeradmin.classList.add("nav-closed");
  }
});


window.addEventListener("resize", function () {
  if (window.innerWidth > responsiveBreakpoint) {
    containeradmin.classList.remove("nav-closed");
  }
});
    },[])
  return (
   <div>
  <div className="containeradmin">
    <div className="headeradmin">
      <div className="headeradmin-logo">
      {/* <Link to='/store/admin'>
          <img className='logoadmin' src="/logo.svg" alt="Evolution" title="Evolution" />
      </Link> */}
      </div>
      <div className="headeradmin-search">
        <button className="button-menu"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 385 385">
            <path d="M12 120.3h361a12 12 0 000-24H12a12 12 0 000 24zM373 180.5H12a12 12 0 000 24h361a12 12 0 000-24zM373 264.7H132.2a12 12 0 000 24H373a12 12 0 000-24z" />
          </svg></button>
        <input type="search" placeholder="Search Documentation..." />
      </div>
    </div>
    <div className="mainadmin">
      <div className="sidebaradmin">
        <ul>
        <li><Link to="#" className="active"><i className="lni lni-home"></i><span>Dashboard</span></Link></li>
<li><Link to="#"><i className="lni lni-text-format"></i><span>Products</span></Link></li>
<li><Link to="#"><i className="lni lni-text-format"></i><span>Categories</span></Link></li>
<li><Link to="#"><i className="lni lni-text-format"></i><span>Sellers</span></Link></li>
<li><Link to="#"><i className="lni lni-text-format"></i><span>Sellers</span></Link></li>
        </ul>
      </div>
      <div className="page-content">
      <Products />
       <Categories />
       <Types />
       <ProductsReview />
       <Orderss />
       <Sellers />
       <Clients />
      </div>
    </div>
  </div>
</div>

  )
}
