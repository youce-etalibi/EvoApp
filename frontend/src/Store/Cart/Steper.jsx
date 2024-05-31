import React, { useContext } from 'react'
import { StepCheckoutcontent } from '../../Context/StepCheckoutcontext'
import { useNavigate } from 'react-router'

export const Steper = () => {
  const { Interface, setinterface } = useContext(StepCheckoutcontent)

  console.log(Interface)

     return (
      <>
      {Interface !== "reviews" &&
       <div className='stepper' id={Interface === "carttable" && 'stepper1'}>
   <button className='step1btn' id={Interface === 'carttable' && "activebtn"}>Cart</button>
   <span className={Interface === "infoclient" && 'activespan'}></span>
   <button className='step2btn'  id={Interface === 'infoclient' && "activebtn"}>Information</button>
   <span className={Interface === "infoclient" && 'activespan'}></span>
   <button className='step4btn' >Reviews</button>
  
</div>
}
      </>



    )
}
