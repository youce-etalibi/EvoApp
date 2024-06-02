import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';

export const Package = () => {

    const [plans,setplans]=useState([])
    const [ToggleAddProduct,setToggleAddProduct] =useState(false)
    const [ToggleEditproduct,setToggleEditproduct] =useState(false)
    const [Toggledeletproduct,setToggledeletproduct] =useState(false)
    const [packageid,setpackageid] =useState()
    
  function openAddProducts() {
    setToggleAddProduct(true);
}
function closeopenAddProducts() {
    setToggleAddProduct(false);
}

    const openEditproducts = (id)=> {
        setpackageid(id);
        setToggleEditproduct(true);
    }
    function closeEditproduct() {
        setToggleEditproduct(false);
    }

    const nav = useNavigate()
    useEffect(() => {
        fetchplan();
    }, []);
    
    
    const fetchplan = () => {
      axios.get('http://127.0.0.1:8000/api/getplans')
      .then(response => {
        setplans(response.data.plans)
        
            })
            .catch(error => {
                console.error(error);
            });
    };
    
    
    
  return (
   
<section className="plans__container">
  <div className="plans">
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
    <div className="planItem__container">
    {plans.map((itm)=>(

      <div className="planItem ">
        <div className="plancard">
          <div className="card__header">
            <h2>{itm.plan_type.name}</h2>
            {itm.plan_type.id == 2 &&
            <div className="card__label label">Best value</div>
}
          </div>
          <div className="card__desc">{itm.description}</div>
        </div>
        <div className="Planprice">$ {itm.price}<span>/ month</span></div>
       
      </div>
    ))}

    </div>
  </div>
</section>

  )
}
