import React, { Fragment, useContext, useState } from 'react'
import './Sidebar.css'
import { Link, useLocation } from 'react-router-dom'
import { WishlistContext } from '../../../Context/WishlistContext'
import { OrderContext } from '../../../Context/OrderContext'
import { AuthContext } from '../../../Context/AuthContext'
export const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const {user_db} =useContext(AuthContext)
  const user =  localStorage.getItem('user');

  console.log(user_db.client)
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (

    <Fragment>
      <div className="parentSideBar">
        <ul>
        {user_db.client && 
            <li>
                <Link to='/store/profile' className="linksidebar">
                    <button id={location.pathname == '/store/profile' ? "btnSideBarActiveProfile" : null}>
                        <span>
                        <span className='profiletext'>Profile</span>
                        <span className='profileicon'><i class='bx bxs-user-circle'></i></span>
                        </span>
                    <i className='bx bx-right-arrow-alt' id="arrowSideBarSeller"></i>
                    </button>
                </Link>
            </li>
}
            <li>
                <Link to='/store/profile/orders' className="linksidebar">
                    <button id={location.pathname == '/store/profile/orders' ? "btnSideBarActiveProfile" : null}>
                        <span>
                        <span className='profiletext'>Orderss</span>
                        <span><i class='bx bxs-cart-add'></i></span>
                        </span>
                    <i className='bx bx-right-arrow-alt' id="arrowSideBarSeller"></i>
                    </button>
                </Link>
            </li>
            <li>
                <Link to='/store/profile/wishlists' className="linksidebar">
                    <button id={location.pathname == '/store/profile/wishlists' ? "btnSideBarActiveProfile" : null}>
                        <span>
                        <span className='profiletext'>wishlists</span>
                        <span ><i class='bx bx-heart' ></i></span>
                        </span>
                    <i className='bx bx-right-arrow-alt' id="arrowSideBarSeller"></i>
                    </button>
                </Link>
            </li>
           
        </ul>
    </div>
    </Fragment>
  )
}
