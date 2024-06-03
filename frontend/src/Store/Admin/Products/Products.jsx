import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { AdminContext } from '../../../Context/AdminContext'
import Paginate from '../../../Components/Paginate/Paginate'
import ModalAddProduct from '../../Seller/AddProducts/Addproducts'
import ModalEditProduct from '../../Seller/EditProduct/EditProduct'
import AddProduct from './Addproducts'
import EditProduct from './EdistProducts'

export const Products = () => {

  const [filteredProducts, setFilteredProducts] = useState([]);

    const [ToggleAddProduct,setToggleAddProduct] =useState(false)
    const [ToggleEditproduct,setToggleEditproduct] =useState(false)
    const [Toggledeletproduct,setToggledeletproduct] =useState(false)
    const [productId, setproductid] = useState(null);
 
  const [products, setproducts] = useState([]);
  const [types, settypes] = useState([]);
  const [categorys, setcategorys] = useState([]);
  const [genders, setgenders] = useState([]);

  const [productName, setproductName] = useState('');
  const [gender, setgender] = useState();
  const [count, setCount] = useState();
  
  const  {isdelete,setisdelete,isadd,editprod} =useContext(AdminContext)

    const [productseller,setproductseller]=useState([])
    const id = localStorage.getItem('seller_id');
    
  const getproducts = () => {
    axios.get(`http://127.0.0.1:8000/api/getproducts`)
   .then(response => {
     setproducts(response.data.products.data);        
     setFilteredProducts(response.data.products.data);   
     setCount(response.data.productCount);
     console.log(response)
   })
   .catch(error => {
       console.error(error);
   })
  }
    
  const getproductsReviews = () => {
    axios.get(`http://127.0.0.1:8000/api/getproductsReviews`)
   .then(response => {
     console.log(response)
   })
   .catch(error => {
       console.error(error);
   })
  }
  
  useEffect(()=>{
    getproducts()
},[isdelete,isadd,editprod])
  
  useEffect(()=>{
    getproductsReviews()
},[])



useEffect(() => {
  filteredProductsFunct();
}, [productName]);

const filteredProductsFunct = () => {
  let filtered = [...products];

  if (productName !== '') {
    filtered = filtered.filter(product => product.title.toLowerCase().includes(productName.toLowerCase()));
  }
  setFilteredProducts(filtered);
};


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
          setFilteredProducts(products.filter((product) => product.id !== id));
          console.log(res)
          setisdelete(!isdelete)
        } catch (error) {
          console.error('Error deleting the product:', error);
        }
      };


      // pour pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const slicedProducts = products.slice(startIndex, endIndex);
      setFilteredProducts(slicedProducts);
    }
  }, [currentPage, products, itemsPerPage]);


  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(count / itemsPerPage);

    return (
        <div id='containertable'>
   
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
    
    <table className='containertable'>
        <thead className='theadseller'>
            <tr className='trseller'>
                <th>Picture </th>
                <th>Product name </th>
                <th>Category</th>
                <th>Type</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Is Sale</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody className='tbody'>
            {filteredProducts.map((res,index)=>(
                <tr className='trseller' key={index}>
                    <td className='tdimage'>
                      {res.seller_id ?  
                       <img   className='imgprodseller' src={`http://127.0.0.1:8000/storage/store/collections/${res.image}`} />
                       :
                       <img className='imgprodseller' src={`/store/Collections/${res.image}`} />
                      }
                     
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
    {ToggleAddProduct && <AddProduct onClose={closeopenAddProducts} />}
        {ToggleEditproduct && <EditProduct productId={productId} onClose={closeEditproduct} />}

        </div>
      
  )
}
