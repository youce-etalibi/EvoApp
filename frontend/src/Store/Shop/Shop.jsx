import React, { useContext, useEffect, useState } from 'react'

import './shop.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { WishlistContext } from '../../Context/WishlistContext'
import { CartContext } from '../../Context/CartContext'
import Paginate from '../../Components/Paginate/Paginate'
import { IconButton } from '@mui/material'
import SimpleBackdrop from '../../Components/Loader/Loader'
import Cookies from 'js-cookie'
import { AuthContext } from '../../Context/AuthContext'


export const ProductsShop = (props) => {

  const [showcat, setshowcat] = useState(true)
  const [showtypes, setshowtypes] = useState(true)
  const [showprice, setshowprice] = useState(true)

  const [types, settypes] = useState([])
  const [collections, setcollections] = useState([])
  const { setaddedtocart, addedtocart } = useContext(CartContext)
  const { user_id} = useContext(AuthContext)
  const { addedtowishlist, setaddedtowishlist } = useContext(WishlistContext)

  console.log(collections)

  const [categorys, setcategorys] = useState([]);
  const [genders, setgenders] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [productName, setProductName] = useState('');
  const [gender, setgender] = useState(
    props.gender == "Men" ? 1 :  props.gender == "Women" ? 2 : ""
  );
  const [type, settype] = useState("");
  const [category, setcategory] = useState("");
  const [priceRange, setpriceRange] = useState(50);
  const [count, setCount] = useState();


  const handlshowcat = () => {
    setshowcat(!showcat)
  }
  const handleshowtype = () => {
    setshowtypes(!showtypes)
  }

  const handlshowprice = () => {
    setshowprice(!showprice)
  }

  const handlCategoryChange = (e) => {
    const newCategory = e.target.value;
    setcategory(newCategory)

  };
 
  const handleTypeChange = (e) => {
    const newtype = e.target.value;
    settype(newtype)
  };

  const handlgenderchange = (e) => {
    const newgender = e.target.value;
    setgender((prevgender) =>
      prevgender === newgender ? '' : newgender
    );

  };

  const handlePriceChange = (e) => {
    const newPriceRange = e.target.value;
    setpriceRange((prevPriceRange) =>
      prevPriceRange === newPriceRange ? '' : newPriceRange
    );
  };

  //filterName

  useEffect(() => {
    filteredProductsFunct();
  }, [productName]);

  const filteredProductsFunct = () => {
    let filtered = [...collections];

    if (productName !== '') {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(productName.toLowerCase()));
    }
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filteredPropFunct();
  }, [props.gender,gender]);

  const filteredPropFunct = () => {
    let filtered = [...collections];

    const genderId = props.gender == "Men" ? 1 : props.gender == "Men" ? 2 : "";
    if (props.gender !== '') {
      filtered = filtered.filter(product => product.gender_id == genderId);
    }
    setFilteredProducts(filtered);
  };


  //filterPrices

  useEffect(() => {
    filteredProductsFunctPrice();
  }, [priceRange]);

  const filteredProductsFunctPrice = () => {
    let filtered = [...collections];

    if (priceRange !== '') {
      filtered = filtered.filter(product => product.price >= parseFloat(priceRange));
    }
    setFilteredProducts(filtered);
  };
  console.log(gender)


  //filterCategories

  useEffect(() => {
    filteredProductsFunctCat();
  }, [category,gender,props.gender]);

  useEffect(() => {
    filteredProductsFuncttype();
  }, [type]);

  const filteredProductsFunctCat = () => {
    let filtered = [...collections];
    if (category !== '') {
      filtered = filtered.filter(product => product.category_id == category);
    };
  
    if (gender !== '') {
      filtered = filtered.filter(product => product.gender_id == gender);
    };
    setFilteredProducts(filtered);
    setCount(filtered.length)
  }
 
  const filteredProductsFuncttype = () => {
    let filtered = [...collections];
    if (type !== '') {
      filtered = filtered.filter(product => product.type_id == type);
    };

    setFilteredProducts(filtered);
    setCount(filtered.length)

  }

  useEffect(() => {
    fetchProducts();

  }, [addedtowishlist,props.gender]);

  useEffect(() => {

    handleWishlist();

  }, [addedtowishlist]);


  useEffect(() => {
    setgender(props.gender === "Men" ? 1 : props.gender === "Women" ? 2 : "");
  
  }, [props.gender]);


  const fetchProducts = () => {
    axios.get('http://127.0.0.1:8000/api/getProductsShop')
      .then(response => {
        let fetchedproduct = response.data.products.data;
        if (props.gender == 'Women') {
          fetchedproduct = fetchedproduct.filter(collection => collection.gender_id == 2);
          setcollections(fetchedproduct);
        }else if(props.gender == 'Men'){
          fetchedproduct = fetchedproduct.filter(collection => collection.gender_id == 1);
          setcollections(fetchedproduct);
        }
        else{
          setcollections(response.data.products.data)
        }
        setFilteredProducts(response.data.products.data);
        settypes(response.data.types);
        setcategorys(response.data.categories);
        console.log(response);
        setgenders(response.data.genders);
        setCount(response.data.productCount);

      })
      .catch(error => {
        console.error(error);
      });
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

  const [ischecked,setisckecked]=useState(true)
  const resetFilters = () => {
    setFilteredProducts()
   if(!props.gender){
    setisckecked(false)
    setpriceRange('50')
    settype([])
   }
  };

  // pour pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  

  useEffect(() => {
    if (Array.isArray(collections) && collections.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const slicedProducts = collections.slice(startIndex, endIndex);
      setFilteredProducts(slicedProducts);
    }
  }, [currentPage, collections, itemsPerPage]);


  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(count / itemsPerPage);

  const filteredGenders = props.gender === "Men"
  ? genders.filter(item => item.name === "Men")
  : props.gender === "Women"
  ? genders.filter(item => item.name === "Women")
  : genders;

  return (
    <div>
      <div className="overlay" />
      <div className='Topshop'>
        {props.gender ? (
          <h2>{props.gender}s</h2>
        ) :
          <h2>All Collections</h2>
        }

      </div>
      <div className="search-section">
        <div className="sidebar-shop " >
          <div className="sidebar__inner ">
            <div className="filter-body">
              <form action="">
                <div >
                  <div className='headsidebar'>
                    <h3>Filter :</h3>
                    {/* <span onClick={resetFilters}>Reset All</span> */}
                  </div>
                  <div className='gender'>

                  {filteredGenders.map((item, index) => (
                          <div key={index} id="ck-button">
                           <label htmlFor={item.name}>
                              <input
                                value={item.id}
                                onChange={handlgenderchange}
                                name="gender"
                                id={item.name}
                                type="radio"
                                checked={ischecked && gender == item.id}
                              />
                              <span >{item.name}</span>
                            </label>
                          </div>
                        ))}
                  </div>

                  <div className='headtitle'>
                    <h3>Shop By Category  :</h3>
                    <span>  <i onClick={handlshowcat} id='arrowdown' className='bx bxs-down-arrow'></i></span>
                  </div>
                  {showcat &&

                      <div className='filterlistCategory' >
                        {categorys.map((item, index) => (
                          <div key={index} id="ck-button">
                            <label htmlFor={item.name}>
                              <input
                                value={item.id}
                                onChange={handlCategoryChange}
                                name="category"
                                id={item.name}
                                type="radio"
                                checked={ischecked && category == item.id}
                              />
                              <span>{item.name}</span>
                            </label>
                          </div>
                        ))}

                      </div>
                  }

                  <div className='headtitle'>
                    <h3>Shop By Price :</h3>
                    <span ><i onClick={handlshowprice} id='arrowdown' className='bx bxs-down-arrow'></i></span>
                  </div>
                  {showprice &&
                    <div className='slider-range'>
                      <div >
                        <span id="slider-range-value1">${priceRange}</span>
                      </div>
                          <div id="slider-range">
                              <input
                                type="range"
                                min="0"
                                max="1000"
                                step="10"
                                value={priceRange}
                                onChange={handlePriceChange}
                              />

                          </div>
                    </div>

                  }
                  <div className='headtitle'>
                    <h3>Shop By Types :</h3>
                    <span>  <i onClick={handleshowtype} id='arrowdown' className='bx bxs-down-arrow'></i></span>
                  </div>
                  {showtypes &&
                    <div classname="filter-options" id="category-options">
                      {types.map((item, index) => (
                        <div key={index} id="ck-button">
                        <label htmlFor={item.name}>
                           <input
                             value={item.id}
                             onChange={handleTypeChange}
                             name="type"
                             id={item.name}
                             type="radio"
                             checked={ischecked && type == item.id}
                           />
                           <span >{item.name}</span>
                         </label>
                       </div>
                      ))}
                    </div>
                  }

                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="shopRight">
          <div className='topsearch'>
            <div className="group">
              <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" /></g></svg>
              <input placeholder="Search" onChange={(e) => setProductName(e.target.value)} type="search" className="input" name="nameProd" />
            </div>

          </div>
          <div id='shopCollection'>

            { 
            collections.length <=0 ? <SimpleBackdrop />
            :
              filteredProducts.map((item) => (
                <div className='parentProducts'>
                <div className='collection-product'>
              
                <Link to={`/store/productdetail/${item.id}`}>
                  {item.seller_id ? 
                   <img  className={item.category.id == 1 && 'imageshoes'} src={`http://127.0.0.1:8000/storage/store/collections/${item.image}`} />
                  :
                <img className={item.category.id == 1 && 'imageshoes'} src={`/store/Collections/${item.image}`} alt="" />
              }
                </Link>
                <span className="Heart"> 
                {item.in_wishlist === 1 ? (
     <IconButton  aria-label="show cart">

                  <i id='addedtowishlist' onClick={()=>handleWishlist(item.id)} class='bx bxs-heart'></i>
                  </IconButton>

                ) : (
     <IconButton  aria-label="show cart">
                  
                  < i  onClick={()=>handleWishlist(item.id)} className='bx bx-heart'></i>
                  </IconButton>
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
          </div>
          <Paginate currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />

        </div>
      </div>
    </div>



  )
}



