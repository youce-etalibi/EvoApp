import React, { useContext, useEffect, useState } from 'react'
import Sellersidebar from '../Sidebarseller/Sidebaseller'
import ModalAddProduct from '../../AddProducts/Addproducts'
import axios from 'axios'
import './Sellerproducts.css'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import ModalEditProduct from '../../EditProduct/EditProduct'
import { SellerContext } from '../../../../Context/Sellercontext'
import { Salleproducts } from '../Salle_products/Salleproducts'
import { FilterBar } from '../../Filterbar/Filterbar'


export const Sellerproducts = () => {

  const [filteredProducts, setFilteredProducts] = useState([]);

    const [ToggleAddProduct,setToggleAddProduct] =useState(false)
    const [ToggleEditproduct,setToggleEditproduct] =useState(false)
    const [Toggledeletproduct,setToggledeletproduct] =useState(false)
    const [productId, setproductid] = useState(null);

  const [types, settypes] = useState([]);
  const [categorys, setcategorys] = useState([]);
  const [genders, setgenders] = useState([]);

  const [productName, setproductName] = useState('');
  const [gender, setgender] = useState();
  const [count, setCount] = useState();


  const  {deleteprod,setdeleteprod,addprod,editprod} =useContext(SellerContext)

    const [productseller,setproductseller]=useState([])
    const id = localStorage.getItem('seller_id');
    
  const getproductseller = () => {
    axios.get(`http://127.0.0.1:8000/api/getproductseller?id=${id}`)
   .then(response => {
     setproductseller(response.data.productseller);        
     setFilteredProducts(response.data.productseller);        
     console.log(response);
   })
   .catch(error => {
       console.error(error);
   })
  }
  
  useEffect(()=>{
  getproductseller()
  },[deleteprod,addprod,editprod])


  function openAddProducts() {
    setToggleAddProduct(true);
}
function closeopenAddProducts() {
    setToggleAddProduct(false);
}

    const openEditproducts = (id)=> {
        setproductid(id);
        setToggleEditproduct(true);
    }
    function closeEditproduct() {
        setToggleEditproduct(false);
    }


    const deleteProduct = async (id) => {
        try {
        const res=   await axios.delete(`http://127.0.0.1:8000/api/product/${id}`);
          setFilteredProducts(productseller.filter((product) => product.id !== id));
          console.log(res)
          setdeleteprod(!deleteprod)
        } catch (error) {
          console.error('Error deleting the product:', error);
        }
      };

      const fetchProducts = () => {
        axios.get('http://127.0.0.1:8000/api/getProductsShop')
          .then(response => {
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

      useEffect(() => {
        fetchProducts();
    
      }, []);


       //filterName

  useEffect(() => {
    filteredProductsFunct();
  }, [productName]);

  const filteredProductsFunct = () => {
    let filtered = [...productseller];

    if (productName !== '') {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(productName.toLowerCase()));
    }
    setFilteredProducts(filtered);
  };


    return (
    <div className='sellerprofile sellerprofile2'>
   <div className='leftsideseller leftsideseller2'>
   <div className='sidebarseller2'>
   <Sellersidebar />
   </div>
    <div className='filterbarseller'>
    <FilterBar filteredProducts={filteredProducts} 
    setFilteredProducts={setFilteredProducts}
     setproductseller={setproductseller}
      productseller={productseller}
      categorys={categorys}
      genders={genders}
      types={types}
      />

    </div>
   </div>
    <div id='productStoreseller'>
   
    <div className='searchheader'>
    <div className='topsearch'>
    <div className="group">
        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
            </g>
        </svg>
        <input placeholder="Search" type="search"  onChange={(e) => setproductName(e.target.value)} className="input" name="nameProd" />
    </div>
    <div className='addproducts'>
        <button className='addproductsbtn' onClick={openAddProducts}>
            Add products
        </button>
    </div>
</div>
    </div>

<table className='tablecrudseller'>
    <thead className='theadseller'>
        <tr className='trseller'>
            <th>Picture </th>
            <th>Product name </th>
            <th>Category</th>
            <th>Type</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Is Sale</th>
            <th></th>
        </tr>
    </thead>
    <tbody className='tbody'>
        {filteredProducts.map((res,index)=>(
            <tr className='trseller' key={index}>
                <td className='tdimage'>
                    <img   className='imgprodseller' src={`http://127.0.0.1:8000/storage/store/collections/${res.image}`} />
                 
                </td>
                <td>{ res.title}</td>
                <td>{res.category && res.category.name}</td>
                <td>{res.type && res.type.name}</td>
                <td >{res.stock}</td>
                <td className='priceseller'>${res.price}</td>
                <td >{res.is_sale === 1 ? 'Yes' : "No"}</td>

                <td>
                    <div className='quantityseller'>
                        <button className="" onClick={() => deleteProduct(res.id)}>
                            <IconButton  aria-label="hide">
                                <span className="span"><i class='bx bx-trash' ></i></span>
                            </IconButton>
                        </button>
                        <button className="" onClick={() => openEditproducts(res.id)}>
                            <IconButton  aria-label="hide">
                                <span className="span"><i class='bx bxs-edit-alt'></i></span>
                            </IconButton>
                        </button>
                    </div>
                </td>
            </tr>
        ))}
    </tbody>
</table>


    </div>
        {ToggleAddProduct && <ModalAddProduct onClose={closeopenAddProducts} />}
        {ToggleEditproduct && <ModalEditProduct productId={productId} onClose={closeEditproduct} />}
    </div>
      
  )
}
