import React, { useEffect, useState } from 'react'
import './plan.css'
import axios from 'axios';
import { useNavigate } from 'react-router';

export const Plan = () => {

    const [plans,setplans]=useState([])
    const seller_id = localStorage.getItem('seller_id');
    
    const nav = useNavigate()
    useEffect(() => {
        fetchplan();
    }, []);
    
    
    const selectedplan = (planid) => {
      const currentDate = new Date().toISOString().slice(0, 10);
      const SellerData = {
        id: seller_id,
        plan_id:planid,
        plan_start_date: currentDate
    };
     console.log(SellerData)
      axios.post('http://127.0.0.1:8000/api/selectedplan',SellerData)
      .then(response => {
        console.log(response)
        nav('/store/seller')
            })
            .catch(error => {
                console.error(error);
            });
    };
    
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
    <div className="plansHero">
      <h1 className="plansHero__title">Select your plan</h1>
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
       
        <button onClick={()=>selectedplan(itm.id)} className="button button--pink">Get Started</button>
      </div>
    ))}

    </div>
  </div>
</section>

  )
}
