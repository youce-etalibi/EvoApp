import React, { useContext, useEffect, useState } from 'react'
import './Filterbar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'


export const FilterBar = (props) => {

//   const [showcat, setshowcat] = useState(true)
//   const [showtypes, setshowtypes] = useState(true)
//   const [showprice, setshowprice] = useState(true)

  const [productseller, setproductseller] = useState(props.productseller);
  const [productName, setproductName] = useState('');
  const [gender, setgender] = useState();
  const [type, settype] = useState("");
  const [isSalle, setisSalle] = useState('');
  const [category, setcategory] = useState("");
  const [priceRange, setpriceRange] = useState(50);
  const [ischecked,setisckecked]=useState(true)
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
  const handlIsSallechange = (e) => {
    const newsalle = e.target.value;
    setisSalle((prevsalle) =>
        prevsalle === newsalle ? '' : newsalle
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
    let filtered = [...props.productseller];

    if (productName !== '') {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(productName.toLowerCase()));
    }
    props.setFilteredProducts(filtered);
  };

  useEffect(() => {
    filteredProductsFunctPrice();
  }, [priceRange]);

  const filteredProductsFunctPrice = () => {
    let filtered = [...props.productseller];

    if (priceRange !== '') {
      filtered = filtered.filter(product => product.price >= parseFloat(priceRange));
    }
    props.setFilteredProducts(filtered);
  };

  console.log(isSalle)
 
  //filterCategories

  useEffect(() => {
    filteredProductsFunctCat();
  }, [category,gender]);

  useEffect(() => {
    filteredProductsFuncttype();
  }, [type]);
  useEffect(() => {
    filteredProductsFunctsale();
  }, [isSalle]);

  const filteredProductsFunctCat = () => {
    let filtered = [...props.productseller];
    if (category !== '') {
      filtered = filtered.filter(product => product.category_id == category);
    };
  
    if (gender !== '') {
      filtered = filtered.filter(product => product.gender_id == gender);
    };
   
    props.setFilteredProducts(filtered);
   
  }
  const filteredProductsFunctsale = () => {
    let filtered = [...props.productseller];
   if (isSalle !== '') {
      filtered = filtered.filter(product => product.is_sale == 1);
    };
   
    props.setFilteredProducts(filtered);
   
  }
 
  const filteredProductsFuncttype = () => {
    let filtered = [...props.productseller];
    if (type !== '') {
      filtered = filtered.filter(product => product.type_id == type);
    };
   

    props.setFilteredProducts(filtered);
  }


  return (
    <div>
      <div className="overlay" />
      <div className="search-section-seller">
        <div className="sidebar-shop-seller " >
          <div className="sidebar__inner ">
            <div className="filter-body">
              <form action="">
                <div >
                <div className='headtitle'>
                    <h3>Filter By Salle  :</h3>
                    <span>  <i  id='arrowdown' className='bx bxs-down-arrow'></i></span>
                  </div>
                 
                <div className=''>

                          <div id="ck-button">
                           <label >
                              <input
                                value='issale'
                                name="gender"
                                onChange={handlIsSallechange}
                                id="issale"
                                type="radio"
                              />
                              <span >selling products</span>
                            </label>
                          </div>
                  </div>
                <div className='headtitle'>
                    <h3>Filter By Gender  :</h3>
                    <span>  <i  id='arrowdown' className='bx bxs-down-arrow'></i></span>
                  </div>
                 
                  <div className=''>

                  {props.genders.map((item, index) => (
                          <div key={index} id="ck-button">
                           <label htmlFor={item.name}>
                              <input
                                value={item.id}
                                name="gender"
                                onChange={handlgenderchange}
                                id={item.name}
                                type="radio"
                              />
                              <span >{item.name}</span>
                            </label>
                          </div>
                        ))}
                  </div>

                  <div className='headtitle'>
                    <h3>Filter By Category  :</h3>
                    <span>  <i  id='arrowdown' className='bx bxs-down-arrow'></i></span>
                  </div>
                

                      <div className='filterlistCategory' >
                        {props.categorys.map((item, index) => (
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

                  <div className='headtitle'>
                    <h3>Filter By Price :</h3>
                    <span ><i  id='arrowdown' className='bx bxs-down-arrow'></i></span>
                  </div>
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
                  <div className='headtitle'>
                    <h3>Filter By Types :</h3>
                    <span>  <i  id='arrowdown' className='bx bxs-down-arrow'></i></span>
                  </div>
                    <div classname="filter-options" id="category-options">
                      {props.types.map((item, index) => (
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
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>



  )
}



