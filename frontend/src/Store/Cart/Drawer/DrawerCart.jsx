import React, { useContext, useEffect, useState } from 'react'
import './Drawer.css'
import { Link } from 'react-router-dom';
import { StepCheckoutcontent } from '../../../Context/StepCheckoutcontext';
import axios from 'axios';
import { CartContext } from '../../../Context/CartContext';
import { IconButton } from '@mui/material';
import { OrderContext } from '../../../Context/OrderContext';

export const DrawerCart = (props) => {
    const { setinterface } = useContext(StepCheckoutcontent)
    const { addedtocart, setdeletedItem, deletedItem, count ,settotalCartPrice,totalCartPrice,setCart,Cart,setisTrue} = useContext(CartContext)

    function deleteFromCart(id) {

        const response = axios.delete(`http://127.0.0.1:8000/api/DeleteCart/${id}`).then(response => {
            console.log('Item deleted:', response.data);
            setdeletedItem(!deletedItem)
            console.log(response.data)
        })
            .catch(error => {
                console.error('Error deleting item:', error);
            });

    };

    const closeCart = () => {
        props.setIsCartOpen(false);
    }

    const increment = (index) => {
        const updatedCart = [...Cart];
        updatedCart[index].quantity++;
        updatedCart[index].total_price = updatedCart[index].price * updatedCart[index].quantity;
        const newTotalCartPrice = updatedCart.reduce((total, item) => total + item.total_price, 0);
        settotalCartPrice(newTotalCartPrice);
        setCart(updatedCart);
    };

    const decrement = (index) => {
        const updatedCart = [...Cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity--;
            updatedCart[index].total_price = updatedCart[index].price * updatedCart[index].quantity;
            const newTotalCartPrice = updatedCart.reduce((total, item) => total + item.total_price, 0);
            settotalCartPrice(newTotalCartPrice);
            setCart(updatedCart);
        }
    };


    const updateCartBackend = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/updateCart`, { Cart: Cart });
            console.log(response.data);
        setisTrue(true)
      props.setIsCartOpen(false)
         
        } catch (error) {
            console.error('Error updating cart:', error);
        }

    };

    console.log(Cart)

   
    return (
        <div className={`cartSidebar ${!props.isCartOpen ? 'hidden' : ''}`}>
            <div className='headdrawer'>
                <div>
                    <i className='bx bx-shopping-bag'></i>{count} Items</div>
                <div>  
     <IconButton  aria-label="hide">

                    <i onClick={closeCart} className='bx bx-x'></i>
                    </IconButton>
                    </div>
            </div>
            {
            count <= 0 ?
            <svg className='svgemptycart' xmlns="http://www.w3.org/2000/svg" width="201" height="200" viewBox="0 0 201 200" fill="none">
  <path d="M70.2613 143.451C70.2613 136.655 71.5436 130.031 74.0733 123.757C76.6926 117.258 80.5396 111.431 85.5026 106.436C90.4678 101.441 96.2602 97.5729 102.72 94.9377C108.957 92.3929 115.541 91.105 122.296 91.105C129.052 91.105 135.636 92.3951 141.873 94.9377C144.013 95.8095 146.076 96.8222 148.063 97.9604L144.311 48.614C143.835 42.3576 138.62 37.5238 132.346 37.5238H124.971H120.949H119.047V31.0581C118.924 13.9132 105.026 0 87.9535 0C70.8827 0 56.985 13.9132 56.8625 31.0581V37.5238H49.9606H43.5613C37.2868 37.5238 32.0716 42.3576 31.5959 48.614L23.5 155.09C23.5 165.715 32.0627 174.329 42.6233 174.329H80.2661C77.7539 170.879 75.6795 167.139 74.0689 163.145C71.5436 156.871 70.2613 150.245 70.2613 143.451ZM114.187 50.858C116.753 50.858 118.834 52.9516 118.834 55.5339C118.834 58.1162 116.753 60.2098 114.187 60.2098C111.62 60.2098 109.539 58.1162 109.539 55.5339C109.539 52.9516 111.62 50.858 114.187 50.858ZM61.5126 60.2098C58.9457 60.2098 56.8646 58.1162 56.8646 55.5339C56.8646 52.9516 58.9457 50.858 61.5126 50.858C64.0794 50.858 66.1604 52.9516 66.1604 55.5339C66.1604 58.1162 64.0794 60.2098 61.5126 60.2098ZM66.1604 31.0581H66.1714C66.1714 18.9567 75.9245 9.14484 87.9535 9.14484C99.9846 9.14484 109.736 18.9567 109.736 31.0581H109.747V37.5238H87.9513H66.1561V31.0581H66.1604Z" fill="#1E2426" fill-opacity="0.1"></path>
  <path d="M119.034 31.0581V37.5238H109.734V31.0581H109.723C109.723 18.9567 99.9718 9.14484 87.9406 9.14484C75.9117 9.14484 66.1585 18.9567 66.1585 31.0581H66.1476H66.1432V37.5238H56.8496V31.0581C56.9722 13.9132 70.8699 0 87.9406 0C105.014 0 118.911 13.9132 119.034 31.0581Z" fill="#BBBDBE"></path>
  <path d="M176.693 191.841L176.715 191.819L155.721 170.698C169.374 153.571 168.308 128.49 152.52 112.606C144.053 104.089 132.956 99.8291 121.86 99.8291C110.763 99.8291 99.6661 104.089 91.1997 112.604C74.2668 129.639 74.2668 157.258 91.1997 174.293C99.6639 182.809 110.761 187.068 121.855 187.068C131.453 187.068 141.049 183.883 148.944 177.514L169.938 198.635L169.956 198.617C170.816 199.471 171.995 200 173.299 200C175.932 200 178.065 197.853 178.065 195.205C178.068 193.895 177.542 192.708 176.693 191.841ZM146.084 167.819C139.394 174.549 130.628 177.913 121.86 177.913C113.093 177.913 104.325 174.549 97.6376 167.819C84.2606 154.361 84.2606 132.541 97.6376 119.081C104.325 112.353 113.096 108.987 121.86 108.987C130.628 108.987 139.392 112.351 146.082 119.081C159.461 132.541 159.461 154.361 146.084 167.819Z" fill="#1E2426" fill-opacity="0.3"></path>
  <circle cx="61.625" cy="55.25" r="5" fill="#BBBDBE"></circle>
  <circle cx="114.125" cy="55.25" r="5" fill="#BBBDBE"></circle>
  </svg>

            :
            Cart.map((cart, index) => (
                <div className='itemsdrawer'>
                    <div className='quantitydrawer'>
                        <button className="" onClick={() => decrement(index)}>
                    <IconButton  aria-label="hide">

                            <span className="span">-</span>
                            </IconButton>

                        </button>
                        <p>{cart.quantity}</p>
                        <button className="" onClick={() => increment(index)} >
                    <IconButton  aria-label="hide">
                            <span className="span">+</span>
                            </IconButton>
                        </button>
                    </div>
                    <div className="imagedrawer">
                    {cart.seller_id ? 
                   <img  src={`http://127.0.0.1:8000/storage/store/collections/${cart.image}`} />
                  :
                        <img src={`/store/Collections/${cart.image}`} alt />
              }
                    </div>
                    <div className="descriptiondrawer">
                        <span>{cart.title}</span>
                        <span>{cart.price} x {cart.quantity}</span>
                        {/* {cart.ProdItems &&
                        <span>{ cart.ProdItems.map((pr)=>(
                            <p>{pr.size.name}  {pr.color.name}</p>
                            
                        ))}</span>} */}
                        <span>{cart.total_price}</span>
                    </div>
                    <IconButton  aria-label="hide">

                    <i id='supprimerdrawer' onClick={() => deleteFromCart(cart.cart_id)} className='bx bx-x'></i>
                    </IconButton>
                </div>

            ))}
          {count > 0 ? (
              <Link to='/store/checkout-1'>
              <button onClick={updateCartBackend} className='viewcartbtn'>View Cart ({totalCartPrice})</button>
          </Link>
          ) : 
          (
            <Link to='/store/shop'>
            <button className='viewcartbtn'>Continue Shipping</button>
        </Link>
          )}
        </div>
    )
}
