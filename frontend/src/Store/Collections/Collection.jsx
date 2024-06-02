import React, { useContext, useEffect, useState } from 'react'
import './Collection.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import { IconButton } from '@mui/material';
import Cookies from "js-cookie"
import { AuthContext } from '../../Context/AuthContext';
export const Collection = () => {


const [collections,setcollections] = useState([])
const [inwishlist,setinwishlist] = useState({})
const {setaddedtocart,addedtocart,setIsaddedtocart} = useContext(CartContext)
const {addedtowishlist,setaddedtowishlist,setdeletedItem,deletedItem} = useContext(WishlistContext)
const iduser = localStorage.getItem('id_active');

useEffect(() => {

  fetchProducts();
 
}, [deletedItem],addedtowishlist);


  const fetchProducts = () => {
    axios.get('http://127.0.0.1:8000/api/getcollections')
        .then(response => {
          setcollections(response.data.products.data);
          console.log(response.data)
        })
        .catch(error => {
            console.error(error);
        });
};


const handlecart = async (id) => {
  const formData = {
      userId: iduser,
      productId: id,
      quantity: 1,
  };
  try {
      const response = await axios.post('http://127.0.0.1:8000/api/cart', formData);
      console.log("Cart response:", response.data);
     
      setIsaddedtocart(true)
      
  } catch (error) {
      console.error("Error adding to cart:", error);
  }
};

const handleWishlist = async (id) => {
  const WishlistData = {
    userId: iduser,
    productId: id,
  };
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/wishlist', WishlistData);
    console.log("wishlist response:", res.data);
    setaddedtowishlist(!addedtowishlist);

    const toggleRes = await axios.post(`http://127.0.0.1:8000/api/toggle-wishlist?id=${iduser}`, { id: id });
    if (toggleRes.data.success) {
      setinwishlist(prevStatus => ({
        ...prevStatus,
        [id]: toggleRes.data.in_wishlist
      }));
      console.log(toggleRes)
    } else {
      console.error('Failed to toggle wishlist');
    }
  } catch (error) {
    console.error("Error adding to WISHLIST:", error);
  }
};

 
  return (
    <div id='collectionStore'>
          <div className='collection-title'>
                <h1>FEATURED COLLECTIONS </h1>
            <Link >
                <img src="/store/Rectangle.svg" className='rectangle' alt="" />
              </Link>
            </div>
            <div id='productParent'>
          {
            collections.length <=0 ?
            <>
            <span className="collectionloader"></span>
            <span className="collectionloader"></span>
            <span className="collectionloader"></span>
            <span className="collectionloader"></span>
            <span className="collectionloader"></span>
            <span className="collectionloader"></span>
            <span className="collectionloader"></span>
            <span className="collectionloader"></span>
            </>
            :
            collections.map((item)=>(
              <div className='parentProducts'>
                <div className='collection-product'>
              
                <Link to={`/store/productdetail/${item.id}`}>
                {item.seller_id ? 
                   <img   className={item.category.id == 1 && 'imageshoes'} src={`http://127.0.0.1:8000/storage/store/collections/${item.image}`} />
                  :
                <img className={item.category.id == 1 && 'imageshoes'} src={`/store/Collections/${item.image}`} alt="" />
              }
                </Link>
                <span className="Heart"> 
                <i id={item.in_wishlist ? 'addedtowishlist' : ''} onClick={() => handleWishlist(item.id)} className={item.in_wishlist ? 'bx bxs-heart' : 'bx bx-heart'}></i>
              </span>
               <div className='buttonsHover'>
                <button onClick={()=>handlecart(item.id)}>Add to cart</button>
               <Link to={`/store/productdetail/${item.id}`}>
               <button>Quick view</button>
               </Link>
               </div>
                </div>
               <div className='detail-prod'>
               <div className='infoProduct'>
                <h4>{item.title}</h4>
                <p>{item.category.name}</p>
                </div>
                <div>
                <h5>${item.price}</h5>
                <p className='typename'>{item.type.name}</p>
                </div>
               </div>
    
                </div>
           
          ))
        }
        </div>
    </div>
  )
}
