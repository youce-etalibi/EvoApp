import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './footer.css'
export const Footer = () => {
    return (
        <footer className="footerstore" >
         <div className="footer-content">
           <div className="footer-col">
            <img src="/EvolutionLogoWhite.png" className='EvolutionLogoWhite' alt="" />
           </div>
           <div className="footer-col">
             <h4>Find A store</h4>
             <ul>
               <li><Link>Order Status</Link></li>
               <li><Link>Safe payement</Link></li>
               <li><Link> Delivery options</Link></li>
             </ul>
           </div>
           <div className="footer-col">
             <h4>online shop</h4>
             <ul>
               <li><Link> Womens Apparel</Link></li>
               <li><Link>Mens Apparel</Link></li>
               <li><Link> Mens Womens Shoes Clothes</Link></li>
             </ul>
           </div>
           <div className="footer-col">
            <h4>Subscribe us</h4>
          <div>
  <input placeholder="Enter your email" className="inputSubscribe" name="email" type="email" />
  <button className="buttonSubscribe">Subscribe</button>
</div>

           </div>
        </div>
        <div className='copyright'>
        © Evolution 2024 All Rights Reserved.


        </div>
    </footer>

    )

}
