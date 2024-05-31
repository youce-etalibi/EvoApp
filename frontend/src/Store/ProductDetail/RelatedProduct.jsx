import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import { AuthContext } from '../../Context/AuthContext';

export const RelatedProduct = (props) => {
  const {user_db,user_id} = useContext(AuthContext)

  const [collections,setcollections] = useState([])
  const {setaddedtocart,addedtocart} = useContext(CartContext)
  const {addedtowishlist,setaddedtowishlist,setdeletedItem,deletedItem} = useContext(WishlistContext)

  const [currentPage, setCurrentPage] = useState(0); 
  const itemsPerPage = 4; 

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleProducts = props.relatedProduct.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(props.relatedProduct.length / itemsPerPage);
    setCurrentPage((prevPage) => Math.min(totalPages - 1, prevPage + 1));
  };

  
const handlecart = async (id) => {
  const formData = {
      userId: user_id,
      productId: id,
      quantity: 1,
  };
  try {
      const response = await axios.post('http://127.0.0.1:8000/api/cart', formData);
      console.log("Cart response:", response.data);
      setaddedtocart(!addedtocart)
      
  } catch (error) {
      console.error("Error adding to cart:", error);
  }
};


useEffect(() => {

  handleWishlist();
 
}, [addedtowishlist]);


const handleWishlist = async (id) => {
  const WishlistData = {
      userId: user_id,
      productId: id,
  };
  try {
      const response = await axios.post('http://127.0.0.1:8000/api/wishlist', WishlistData);
      console.log("wishlist response:", response.data);
      setaddedtowishlist(!addedtowishlist)

  } catch (error) {
      console.error("Error adding to WISHLIST:", error);
  }
};
console.log(props)

  return (
   
         <div id='relatedProduct'>
         <div className='section1-title'>
                <h1>Related Products</h1>
                <img src="/store/Rectangle.svg" className='rectangle' alt="" />
            </div>
         
            <div id='parentRelatedProduct'>
        <div id='productRelated'>
         

          {
            visibleProducts.map((item)=>(
              <div className='parentProducts'>
                   <button id='btnpaginateleft' className="pagination-button" onClick={handlePrevPage}>
            <i class='bx bx-left-arrow-alt' ></i>
        </button>
              <div className='collection-product'>
            
              <Link to={`/store/productdetail/${item.id}`}>
              {item.seller_id ? 
                   <img src={`http://127.0.0.1:8000/storage/store/collections/${item.image}`} />
                  :
              <img src={`/store/Collections/${item.image}`} alt="" />
              }
              </Link>
              <span className="Heart"> 
              {item.in_wishlist === 1 ? (
                <i id='addedtowishlist' onClick={()=>handleWishlist(item.id)} class='bx bxs-heart'></i>

              ) : (
                
                < i  onClick={()=>handleWishlist(item.id)} className='bx bx-heart'></i>
              )}
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

        <button id='btnpaginateright' className="pagination-button" style={{ margin: "90px 30px 0 0" }} onClick={handleNextPage} disabled={currentPage === Math.ceil(props.relatedProduct.length / itemsPerPage) - 1}>
<i class='bx bx-right-arrow-alt'></i>
        </button>
   
        </div>
        </div>
      

    </div>
    
  )
}
