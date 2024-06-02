import React, { Fragment, useState } from "react";
import "./Sidebarseller.css";
import { Link, useLocation } from "react-router-dom";

const Sellersidebar = () => {
 
    const location = useLocation();

  return (
    <Fragment>
    <div className="parentSideBarSeller">
        <ul>
            <li>
                <Link to='/store/seller/profileseller' className="linkseller">
                    <button id={location.pathname == '/store/seller/profileseller' ? "btnSideBarActiveProfile" : null}>
                        <span>
                        <span className='profiletext'>Profile</span>
                        <span className='profileicon'><i class='bx bxs-user-circle'></i></span>
                        </span>
                    <i className='bx bx-right-arrow-alt' id="arrowSideBarSeller"></i>
                    </button>
                </Link>
            </li>
            <li>
                <Link to='/store/seller/products' className="linkseller">
                    <button id={location.pathname == '/store/seller/products' ? "btnSideBarActiveProfile" : null}>
                        <span>
                        <span  className='profiletext'>Products</span>
                        <span><i class='bx bxs-cart-add'></i></span>

                        </span>
                    <i className='bx bx-right-arrow-alt' id="arrowSideBarSeller"></i>
                    </button>
                </Link>
            </li>
           
        </ul>
    </div>

    
</Fragment>
  );
};

export default Sellersidebar;