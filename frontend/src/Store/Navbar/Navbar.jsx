
import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { DrawerCart } from '../Cart/Drawer/DrawerCart'
import { MenuContext } from '../../Context/MenuContext'
import { CartContext } from '../../Context/CartContext'

import axios from 'axios'
import { WishlistContext } from '../../Context/WishlistContext'
import { IconButton } from '@mui/material'
import Profile from '../../Components/Profile/Profile'
import { Menu } from '../../Components/Menu/Menu'
export const Navbar = () => {
   const { isactive, setisactive } = useContext(MenuContext);
   const { deletedItem,addedtocart,count  } = useContext(CartContext);
   const {addedtowishlist,setcountwishlist,countwishlist,deletedItemwishlist,setdeletedItemwishlist} = useContext(WishlistContext);
    const [categorys, setcategorys] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };
    const Closecart = () => {
        setIsCartOpen(false);
    };
  

    useEffect(() => {
        const preventScroll = (event) => {
            if (isCartOpen) {
                event.preventDefault();
            }
        };
    
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('touchmove', preventScroll, { passive: false });
            document.addEventListener('mousewheel', preventScroll, { passive: false });
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.backgroundColor = ''; // Reset background color
            document.removeEventListener('touchmove', preventScroll, { passive: false });
            document.removeEventListener('mousewheel', preventScroll, { passive: false });
        }
    
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.backgroundColor = ''; // Reset background color
            document.removeEventListener('touchmove', preventScroll, { passive: false });
            document.removeEventListener('mousewheel', preventScroll, { passive: false });
        };
    }, [isCartOpen]);


    const menuBtnRef = useRef(null);
    const menuRef = useRef(null);
    const dropdownRefs = useRef([]);
    const subDropdownRefs = useRef([]);
    let menuOpen = false;

    useEffect(() => {
        const menuBtn = menuBtnRef.current;
        const menu = menuRef.current;
        const dropdowns = dropdownRefs.current;
        const subDropdowns = subDropdownRefs.current;

        const toggleMenu = () => {
            menu.classList.toggle('mega-menu-show');
        };

        const handleDropdownClick = (dropdown) => {
            dropdown.nextElementSibling.classList.toggle('menu-show');
            dropdown.lastElementChild.classList.toggle('icon-rotated');
        };

        const handleSubDropdownClick = (subDropdown) => {
            subDropdown.nextElementSibling.classList.toggle('sub-menu-show');
            subDropdown.lastElementChild.classList.toggle('icon-rotated');
        };

        if(menuBtn){

          menuBtn.addEventListener('click', toggleMenu);
        }

        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener('click', () => handleDropdownClick(dropdown));
        });

        subDropdowns.forEach((subDropdown) => {
            subDropdown.addEventListener('click', () => handleSubDropdownClick(subDropdown));
        });

        return () => {

            subDropdowns.forEach((subDropdown) => {
                subDropdown.removeEventListener('click', () => handleSubDropdownClick(subDropdown));
            });

        };
    }, []);
  return (

<nav className="navbar">
  <Menu />
<div className="storelogo">
 <Link to='/store'>
          <img src="/Evolution.png" alt="Evolution" title="Evolution" />
      </Link>
  </div>
  <div className="menu-container" ref={menuRef}>
    <ul className="mega-menu">
     
      <li className="dropdown">
      <div ref={(el) => dropdownRefs.current.push(el)}>
          <span> <Link to='/store/shop-mens'>Mens   </Link></span>
        
          <span className="material-symbols-outlined">
            <i class='bx bxs-chevron-down'></i>
          </span>
        </div>
        <ul className="menu">
          <li>
          <Link to='/store/shop-mens'>
              Men
              </Link>
          </li>
          <li className="sub-dropdown">
            <div ref={(el) => dropdownRefs.current.push(el)}>
              <span>Shoes</span>
              <span className="material-symbols-outlined">
                <i class='bx bxs-chevron-down'></i>
              </span>
            </div>
            <ul className="sub-menu">
              <li>
                <a href="#">All Shoes</a>
              </li>
              <li>
              <Link to='/store/shop'>
              Sport
              </Link>
              </li>
            
              <li>
              <Link to='/store/shop'>
              Running
              </Link>
              </li>
            </ul>
          </li>
          <li className="sub-dropdown">
            <div ref={(el) => dropdownRefs.current.push(el)}>
              <span>Clothing</span>
              <span className="material-symbols-outlined">
                <i class='bx bxs-chevron-down'></i>
              </span>
            </div>
            <ul className="sub-menu">
              <li>
                <a href="#">All Clothing</a>
              </li>
              <li>
              <Link to='/store/shop'>
              Tops and T-Shirts
              </Link>
              </li>
              <li>
              <Link to='/store/shop'>
              Slims
              </Link>
              </li>
              <li>
              <Link to='/store/shop'>
              Shorts
              </Link>
              </li>
              <li>
              <Link to='/store/shop'>
              Caps
              </Link>
              </li>
            </ul>
          </li>

          <li className="sub-dropdown-img">
           
            
            </li>
       
        </ul>
      </li>
      {/* Women section */}
      <li className="dropdown">
        <div ref={(el) => dropdownRefs.current.push(el)}>
          <span> <Link to='/store/shop-womens'>Womens   </Link></span>
        
          <span className="material-symbols-outlined">
            <i class='bx bxs-chevron-down'></i>
          </span>
        </div>
        <ul className="menu">
          <li>
          <Link to='/store/shop-women'>
              Women
              </Link>
          </li>
          <li className="sub-dropdown">
            <div>
              <span>Shoes</span>
              <span className="material-symbols-outlined">
                <i class='bx bxs-chevron-down'></i>
              </span>
            </div>
            <ul className="sub-menu">
              <li>
                <a href="#">All Shoes</a>
              </li>
              <li>
              <Link to='/store/shop'>
              Sport
              </Link>
              </li>
            
              <li>
              <Link to='/store/shop'>
              Running
              </Link>
              </li>
            </ul>
          </li>
          <li className="sub-dropdown">
            <div ref={(el) => dropdownRefs.current.push(el)}>
              <span>Clothing</span>
              <span className="material-symbols-outlined">
                <i class='bx bxs-chevron-down'></i>
              </span>
            </div>
            <ul className="sub-menu"  ref={(el) => dropdownRefs.current.push(el)}>
              <li>
                <a href="#">All Clothing</a>
              </li>
              <li>
              <Link to='/store/shop'>
              Tops and T-Shirts
              </Link>
              </li>
              <li>
              <Link to='/store/shop'>
              Slims
              </Link>
              </li>
              <li>
              <Link to='/store/shop'>
              Shorts
              </Link>
              </li>
              <li>
              <Link to='/store/shop'>
              Caps
              </Link>
              </li>
            </ul>
          </li>

          <li className="sub-dropdown-imgwomen">
           
            
            </li>
       
        </ul>
      </li>
      <li className="dropdown">
        <div ref={(el) => dropdownRefs.current.push(el)}>
          <span> <Link to='/store/shop'>Shop</Link></span>
          <span className="material-symbols-outlined">
            <i class='bx bxs-chevron-down'></i>
          </span>
        </div>
        <ul className="menu">
          <li>
            <a href="#">Categories</a>
          </li>
          <li className="sub-dropdown"  ref={(el) => dropdownRefs.current.push(el)}>
           
            <ul className="sub-menu">
              <li>
              <Link to='/store/shop'>
              Shoes
              </Link>
              </li>
              <li>
              <Link to='/store/shop'>
              Clothes
              </Link>
              </li>
            
            </ul>
          </li>
          <li className="sub-dropdown">
           
          <ul className="sub-menu">
              <li>
                <a href="#">All Clothing</a>
              </li>
              <li>
              <Link to='/store/shop'>
              Tops and T-Shirts
              </Link>
              </li>
              <li>
              <Link to='/store/shop'>
              Slims
              </Link>
              </li>
              <li>
              <Link to='/store/shop'>
              Shorts
              </Link>
              </li>
              <li>
              <Link to='/store/shop'>
              Caps
              </Link>
              </li>
            </ul>
          </li>
          <li className="sub-dropdown-imgshop">
           
            
           </li>
        </ul>
      </li>
      <li className="dropdown">
        <div >
          <span> <Link to='/store/seller'>Be a seller </Link></span>
          <span className="material-symbols-outlined">
            <i class='bx bxs-chevron-down'></i>
          </span>
        </div>
      </li>
     
    </ul>
  
<div className="storeLinks">
 <ul id="linksbar">
     <li className='iconsbar'>
     <IconButton  aria-label="show cart">

         <i className='bx bx-shopping-bag' onClick={toggleCart}></i>
</IconButton>
        {count > 0 &&  <span className='badgecart'>{count}</span>}
        </li>
     <li className='iconsbar'>
        
        <Link to='/store/profile/wishlists'>
      <IconButton  >
        <i className='bx bx-heart' ></i>

</IconButton>
        {countwishlist > 0 &&   <span className='badgewishlits'>{countwishlist}</span>}
        </Link>
        </li>
        <li className='iconsbar'>
          <Profile />
        
        </li>
       
 </ul>
</div>

  </div>
  <div className="buttonsnav">
      <span className="material-symbols-outlined">
      <i  ref={menuBtnRef} class='bx bx-menu' ></i>
      </span>
  </div>
   {isCartOpen && (
<div >
<div className='slide-cart-layout' onClick={Closecart}>
</div>
<DrawerCart setIsCartOpen={setIsCartOpen}  isCartOpen={isCartOpen}/>
</div>

)}
</nav>

  )
}

 