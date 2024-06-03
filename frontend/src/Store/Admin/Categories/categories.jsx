import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { AdminContext } from '../../../Context/AdminContext'
import Addcat from './Addcategory'
import Paginate from '../../../Components/Paginate/Paginate'
import Editcategories from './Editcategories'

export const CategoriesAdmin = () => {


    const [ToggleAddCat,setToggleAddCat] =useState(false)
    const [ToggleEditCat,setToggleEditCat] =useState(false)
    const [Toggledeletcat,setToggledeletcat] =useState(false)
    const [catId, setcatId] = useState(null);
 
  const  {isdelete,setisdelete,isedit,isadd} =useContext(AdminContext)

    const [categories,setcategories]=useState([])
    
  const getcategories = () => {
    axios.get(`http://127.0.0.1:8000/api/getCategoriesTypes`)
   .then(response => {
     setcategories(response.data.categorys);        
     console.log(response)
   })
   .catch(error => {
       console.error(error);
   })
  }
  
  useEffect(()=>{
    getcategories()
  },[isdelete,isedit,isadd])


  function openAddProducts() {
    setToggleAddCat(true);
}
function closeopenAddProducts() {
    setToggleAddCat(false);
}

    const openEditproducts = (id)=> {
        setcatId(id);
        setToggleEditCat(true);
    }
    function closeEditproduct() {
        setToggleEditCat(false);
    }


    const deletecat = async (id) => {
        try {
        const res=   await axios.delete(`http://127.0.0.1:8000/api/category/${id}`);
          console.log(res)
          setisdelete(!isdelete)
        } catch (error) {
          console.error('Error deleting the product:', error);
        }
      };

    return (
        <div id='productStoreseller'>
   
        <div className='searchheader'>
        <div className='topsearch'>
        <div className="group">
        </div>
        <div className='addproducts'>
            <button className='addproductsbtn' onClick={openAddProducts}>
                Add Category
            </button>
        </div>
    </div>
        </div>
<section className="containertable">
  <table className="order-table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Types</th>
      </tr>
    </thead>
    <tbody>
      {categories.map((cat)=>(
          <tr>
        <td> {cat.id}</td>
        <td>{cat.name}</td>
        <td>
    {cat.types && cat.types.map(type => type.name).join(' , ')}
</td>

        <td></td>
        <td>
                        <div className='quantityseller'>
                            <button className="" onClick={() => deletecat(cat.id)}>
                                <IconButton  aria-label="hide">
                                    <span className="span"><i class='bx bx-trash' ></i></span>
                                </IconButton>
                            </button>
                            <button className="" onClick={() => openEditproducts(cat.id)}>
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
</section>


    {ToggleAddCat && <Addcat onClose={closeopenAddProducts} />}
        {ToggleEditCat && <Editcategories catId={catId} onClose={closeEditproduct} />}

        </div>
      
  )
}
