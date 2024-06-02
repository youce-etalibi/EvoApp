import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Wishlist.css'
import { CartContext } from '../../../Context/CartContext'
import { AuthContext } from '../../../Context/AuthContext'
import { WishlistContext } from '../../../Context/WishlistContext'

export const Wishlist = () => {
  const { setAddedToCart, addedToCart,setdeletedItemwishlist,deletedItemwishlist } = useContext(CartContext)
  const {wishlist,countwishlist} =useContext(WishlistContext)
  const {user_id} =React.useContext(AuthContext)
  
  
 
    const handleCart = async (id) => {
      const formData = {
        userId: user_id,
        productId: id,
        quantity: 1,
      };
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/cart', formData);
        console.log("Cart response:", response.data);
        setAddedToCart(!addedToCart)
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };

    const handleWishlist = (id)=> {
        const response = axios.delete(`http://127.0.0.1:8000/api/DeleteWishlist/${id}`).then(response => {
            console.log('Item deleted:', response.data);
            setdeletedItemwishlist(!deletedItemwishlist)
            console.log(response.data)
        })
            .catch(error => {
                console.error('Error deleting item:', error);
            });

    };

    console.log(wishlist)

    return (
      <div>
      {countwishlist > 0 ? (
        <div className='titledashboard'>
          <h2><i className='bx bx-heart' id='wishlistsIcon'></i> My Wishlists</h2>
        </div>
      ) : (
        <div className='emptyorder' id='emptywishlist'>
          <img src="/store/emptyfav.png" alt="" />
          <div className='orderempty-text'>
            <h4>Your Wishlist is empty</h4>
            <p>Seems like you don't have wishes here. <br/></p>
            <Link to='/store/shop'>
              <button className='viewcartbtn-order'>Make a wish</button>
            </Link>
          </div>
        </div>
      )}
    
      <div id='wishlistsParent'>
        {wishlist.map((item) => (
          <div key={item.id} className='parentProducts'>
            <div className='collection-product'>
              <Link to={`/store/productdetail/${item.product.id}`}>
                <img src={item.product.seller_id ? `http://127.0.0.1:8000/storage/store/collections/${item.product.image}`:`/store/Collections/${item.product.image}`} />

              </Link>
              <span className="Heart"> 
                <i id='addedtowishlist' onClick={() => handleWishlist(item.id)} className='bx bxs-heart'></i>
              </span>
              <div className='buttonsHover'>
                <button onClick={() => handleCart(item.product.id)}>Add to cart</button>
                <Link to={`/store/productdetail/${item.product.id}`}>
                  <button>Quick view</button>
                </Link>
              </div>
            </div>
            <div className='detail-prod'>
              <div className='infoProduct'>
                <h4>{item.product.title}</h4>
                <p>{item.product.category.name}</p>
              </div>
              <div>
                <h5>${item.product.price}</h5>
                <p className='typename'>{item.product.type.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  )
}
