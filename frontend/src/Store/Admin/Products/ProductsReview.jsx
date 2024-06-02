import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { AdminContext } from '../../../Context/AdminContext'


export const ProductsReview = () => {

  const [productsreview, setproductsreview] = useState([]);

    const [ToggleAddProduct,setToggleAddProduct] =useState(false)
    const [ToggleEditproduct,setToggleEditproduct] =useState(false)
    const [Toggledeletproduct,setToggledeletproduct] =useState(false)
    const [productId, setproductid] = useState(null);
 
  const  {isdelete,setisdelete,isadd,editprod} =useContext(AdminContext)
    
  const getproductsReviews = () => {
    axios.get(`http://127.0.0.1:8000/api/getproductsReviews`)
   .then(response => {
    setproductsreview(response.data.productsreview)
     console.log(response)
   })
   .catch(error => {
       console.error(error);
   })
  }

  useEffect(()=>{
    getproductsReviews()
},[])


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
        const res=   await axios.delete(`http://127.0.0.1:8000/api/productreview/${id}`);
          console.log(res)
          setisdelete(!isdelete)
        } catch (error) {
          console.error('Error deleting the product:', error);
        }
      };


    return (
        <div id='productStoreseller'>
    
    <table className='tablecrudseller'>
        <thead className='theadseller'>
            <tr className='trseller'>
                <th>Picture </th>
                <th>name</th>
                <th>User</th>
                <th>Comment</th>
                <th>Rating</th>
                <th>Publish</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody className='tbody'>
            {productsreview.map((res,index)=>(
                <tr className='trseller' key={index}>
                    <td className='tdimage'>
                      {res.product.seller_id ?  
                       <img   className='imgprodseller' src={`http://127.0.0.1:8000/storage/store/collections/${res.product.image}`} />
                       :
                       <img className='imgprodseller' src={`/store/Collections/${res.product.image}`} />
                      }
                    </td>
                    <td className='badgetable'>{ res.product.title}</td>
                    <td>{res.user && res.user.name}</td>
                    <td>{res.message}</td>
                    <td >
                    {[...Array(5)].map((star, index) => (
                <i
                  key={index}
                  className='bx bxs-star'
                  style={{ color: index < res.rating ? 'red' : 'gray' }}
                ></i>
              ))}
                    </td>
                    <td >
               <label className="switch">
  <input defaultChecked type="checkbox" />
  <div className="slider">
    <div className="circle">
      <svg className="cross" xmlSpace="preserve" style={{enableBackground: 'new 0 0 512 512'}} viewBox="0 0 365.696 365.696" y={0} x={0} height={6} width={6} xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path data-original="#000000" fill="currentColor" d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0" />
        </g>
      </svg>
      <svg className="checkmark" xmlSpace="preserve" style={{enableBackground: 'new 0 0 512 512'}} viewBox="0 0 24 24" y={0} x={0} height={10} width={10} xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path className data-original="#000000" fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
        </g>
      </svg>
    </div>
  </div>
</label>

                    </td>
    
                    <td>
                        <div className='quantityseller'>
                            <button className="" onClick={() => deleteProduct(res.id)}>
                                <IconButton  aria-label="hide">
                                    <span className="span"><i class='bx bx-trash' ></i></span>
                                </IconButton>
                            </button>
                           
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    
        </div>
      
  )
}
