import React, { useContext, useEffect, useState } from 'react';
import './ProductDetail.css';
import { Link, useParams } from 'react-router-dom';
import { RelatedProduct } from './RelatedProduct';
import { Description } from './Description';
import { StepCheckoutcontent } from '../../Context/StepCheckoutcontext';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import { Reviews } from './Reviews/Reviews';
import { WishlistContext } from '../../Context/WishlistContext';
import { Alert } from '@mui/material';
import SimpleBackdrop from '../../Components/Loader/Loader';
import Cookies from 'js-cookie'
import { AuthContext } from '../../Context/AuthContext';
export const Productdetail = () => {
    const { id } = useParams();

    const{addedtocart,setaddedtocart,addedreview,setaddedreview} =useContext(CartContext)
    const {addedtowishlist,setaddedtowishlist,setdeletedItem,deletedItem} = useContext(WishlistContext)
    const {user_id} = useContext(AuthContext)
    

  const [reviews,setreviews] = useState([])
  const [message,setmessage] = useState('')
  const [messageError,setmessageError] = useState('')

    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [res, setRes] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(1);
    const [selectedColor, setSelectedColor] = useState(2);
    const [inwishlist, setinwishlist] = useState(false);
    const [mainDetail, setMainDetail] = useState('description');

    const [relatedCategory, setRelatedCategory] = useState([]);
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [IsShow, setIsShow] = useState(true);
  
    useEffect(() => {
        fetchData();
    }, [addedtowishlist]);
    useEffect(() => {
        fetchreviews();
    }, [addedreview]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/product-detail/${id}`);
            setSizes(response.data.productsizes);
            setColors(response.data.productcolors);
            setRes(response.data.product);
            setIsShow(response.data.product.length <=0 ? false : true)
            setinwishlist(response.data.inwishlist);
            const CatId = response.data.product.category_id;
            const products = response.data.allProducts;
            const filteredCat = products.filter((prod) => prod.category_id === CatId);
        
            setRelatedCategory(filteredCat);
            setRelatedProduct(response.data.related_products.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const fetchreviews = async () => {
        try {
            
            const response = await axios.get(`http://127.0.0.1:8000/api/reviews`);
            setreviews(response.data.reviews)
            console.log(reviews)
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const increment = () => {
        setQuantity(quantity + 1);
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'size') {
            setSelectedSize(selectedSize === value ? '' : value);
        } else if (name === 'color') {
            setSelectedColor(selectedColor === value ? '' : value);
        }
    };

    const handlsub = async (e) => {
        e.preventDefault();
        const formData = {
            userId: user_id,
            productId: res.id,
            quantity: quantity,
            size: selectedSize,
            color: selectedColor
        };
      
        console.log(formData)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cart', formData);
            console.log("Cart response:", response.data);
            setmessage(response.data.message)
            setaddedtocart(!addedtocart)
        } catch (error) {
            console.error("Error adding to cart:", error);
            setmessageError(error.response.data.message)
        }
    };

    const handleclick = () => {
        setMainDetail('description');
    };

    const handleclickreviews = () => {
        setMainDetail('reviews');
    };


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

      console.log(reviews)
    return (
        <div className="productdetailParent">
            {!IsShow? <SimpleBackdrop /> :
            <div className='productdetail'>
                <div className="product-banner">
                <img src={res.seller_id ? `http://127.0.0.1:8000/storage/store/collections/${res.image}`: `/store/Collections/${res.image}`} width={600} height={600} className="img-cover"  />
                        <span className="stockstatu">{res.stock === 0 ? "Stock out" : 'In stock'}</span>
                
                </div>
                <div className="product-content">
                    
                    <p className="product-subtitle">{res.type && res.type.name}</p>
                    <div className="wrapper">
                        <span className="price">${res.price}</span>
                        <h1 className="h1 product-title">{res.title}</h1>
                    </div>
                    <p className="product-text">{res.sub_description}</p>
                    <form className='form' onSubmit={handlsub}>
                        <div className="size-select">
                            <p>Size :</p>
                            {sizes.map((size, index) => (
                                <label key={index} htmlFor={size.name}>
                                    <input checked={size.id == selectedSize}  onChange={handleChange} type="radio" value={size.id} name="size" id={size.name} />
                                    <span>{size.name}</span>
                                </label>
                            ))}
                        </div>
                        <div className="select-color">
                            <p>Top Colors :</p>
                            {colors.map((color, index) => (
                                <label key={index}>
                                    <input checked={color.id == selectedColor}   onChange={handleChange} value={color.id} type="radio" name="color" />
                                    <span className={color.name} />
                                </label>
                            ))}
                        </div>
                        <div className="btn-group">
                            <div className='quantity'>
                                    <span className="span moin-btn" onClick={decrement}>-</span>
                                <span className='quantitynumber'>{quantity}</span>
                                    <span className="span plus-btn"  onClick={increment}>+</span>
                            </div>
                            <button type='submit' className="cart-btn">
                                <span className="span">Add to cart</span>
                            </button>
                            <Link to="#" className="wishlitsbtn">
                                <span className="span">
                                {inwishlist ? (
                  <i id='addedtowishlist' onClick={()=>handleWishlist(res.id)} class='bx bxs-heart'></i>

                ) : (
                  
                  < i  onClick={()=>handleWishlist(res.id)} className='bx bx-heart'></i>
                )}
                                </span>
                            </Link>
                        </div>
   {message && <Alert className='msgalert' severity="success">{message}</Alert>}
   {messageError && <Alert className='msgalert' severity="error">{messageError}</Alert>}

                    </form>
                </div>

            </div>
            }
            <div className='maindetail'>
                <ul>
                    <li onClick={handleclick} className={mainDetail === "description" ? "activelinrevk" : ""}>Description </li>
                    <li onClick={handleclickreviews} className={mainDetail === "reviews" ? "activelinrevk" : ""}>Reviews  </li>
                </ul>
                {mainDetail === "description" && <Description Description={res.description} />}
                {mainDetail === "reviews" && <Reviews idprod={res.id} reviews={reviews}/>}
            </div>
            <RelatedProduct relatedProduct={relatedProduct} fetchData={fetchData} />
        </div>
    );
};
