import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { AdminContext } from '../../../Context/AdminContext'
import EditTypes from './edittypes'
import Addtype from './Addtpes'

export const Types = () => {


    const [ToggleAddCat,setToggleAddCat] =useState(false)
    const [ToggleEditCat,setToggleEditCat] =useState(false)
    const [Toggledeletcat,setToggledeletcat] =useState(false)
    const [typeId, setTypeId] = useState(null);
 
  const  {setisdelete,isdelete,isedit,isadd} =useContext(AdminContext)

    const [types,settypes]=useState([])
    
  const gettypes = () => {
    axios.get(`http://127.0.0.1:8000/api/gettypes`)
   .then(response => {
     settypes(response.data.types);        
     console.log(response)
   })
   .catch(error => {
       console.error(error);
   })
  }
  
  useEffect(()=>{
    gettypes()
  },[isedit,isadd,isdelete])


  function openAddProducts() {
    setToggleAddCat(true);
}
function closeopenAddProducts() {
    setToggleAddCat(false);
}

    const openEditproducts = (id)=> {
        setTypeId(id);
        setToggleEditCat(true);
    }
    function closeEditproduct() {
        setToggleEditCat(false);
    }


    const deletetype = async (id) => {
        try {
        const res=   await axios.delete(`http://127.0.0.1:8000/api/type/${id}`);
        //   setFilteredProducts(products.filter((product) => product.id !== id));
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
                Add Type
            </button>
        </div>
    </div>
        </div>
<section className="containertable" >
  <table className="order-table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>

      </tr>
    </thead>
    <tbody>
      {types.map((type)=>(
          <tr>
        <td> {type.id}</td>
        <td>{type.name}</td>
        <td>
                        <div className='quantityseller'>
                            <button className="" onClick={() => deletetype(type.id)}>
                                <IconButton  aria-label="hide">
                                    <span className="span"><i class='bx bx-trash' ></i></span>
                                </IconButton>
                            </button>
                            <button className="" onClick={() => openEditproducts(type.id)}>
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


    {ToggleAddCat && <Addtype onClose={closeopenAddProducts} />}
        {ToggleEditCat && <EditTypes typeId={typeId} onClose={closeEditproduct} />}

        </div>
      
  )
}
