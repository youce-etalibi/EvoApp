import React, { useContext, useEffect, useState } from 'react'
import './Infoclient.css'
import '../Cartparent.css'
import { CartContext } from '../../../Context/CartContext'
import axios from 'axios'
import { StepCheckoutcontent } from '../../../Context/StepCheckoutcontext'
import { useNavigate } from 'react-router'
import { Steper } from '../Steper'
import { OrderContext } from '../../../Context/OrderContext'
import { Alert } from '@mui/material'
import { AuthContext } from '../../../Context/AuthContext'
export const Infoclient = () => {
  const { setinterface } = useContext(StepCheckoutcontent)
  const userId = localStorage.getItem('id_active');

  const {totalCartPrice,Cart} = useContext(CartContext)
  const handleback = () => {
    nav('/store/checkout-1')
}

const nav = useNavigate()

const {setaddedorder,addedorder} =useContext(OrderContext)
const {isclient,setisclient} =useContext(AuthContext)
const [clientdata,setClientdata]=useState([])
const [deliveryPrice, setDeliveryPrice] = useState(0);
const [messageError, setmessageError] = useState();
  const [isclicked,setisclicked] =useState(false)
const [deliveryoption,setdeliveryoption]=useState('')
  const [formData,setformData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    userId: '',
    delivery_id: '',
   })
  const [Errors,setErrors] = useState({})
  
  const handleChange = (e) => {
    setformData({...formData,[e.target.name] : e.target.value})
    setErrors({ ...Errors, [e.target.name]: '' });
    if (formData.delivery_id) {
      const selectedOption = delivery.find((option) => option.id === parseInt(e.target.value));
      if (selectedOption) {
        setDeliveryPrice(parseFloat(selectedOption.price));
      }
    }
  
}

const validateForm = () => {
  const validationErrors = {};
if(!clientdata){
  
  if (formData.firstname.trim() === '') {
    validationErrors.firstname = "firstname required";
}else if (/\d/.test(formData.firstname)) {
  validationErrors.firstname = "invalide";
}
if (formData.lastname.trim() === '') {
    validationErrors.lastname = 'lastname required';
}else if (/\d/.test(formData.lastname)) {
  validationErrors.lastname ="invalid";
}
if (formData.email.trim() === '') {
    validationErrors.email = "email required";
} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
validationErrors.email = "invalid";
}

if (formData.phone.trim() === '') {
    validationErrors.phone = "phone required";
} 
if (formData.city.trim() === '') {
    validationErrors.city = "city required";
} 
if (formData.address.trim() === '') {
    validationErrors.adress = "adress required";
}
if (formData.delivery_id.trim() === '') {
    validationErrors.delivery_id = "delivery required";
}
} 
  setErrors(validationErrors);

  return Object.keys(validationErrors).length === 0;
};

const AddOrder = (e) => {
e.preventDefault()
setisclicked(true)
 
if (!validateForm()) {
      
    return; 
}
const isFormValid = validateForm();

  const orderItems = Cart.map(item => ({
      productId: item.product_id,
      quantity: item.quantity,
      price: item.total_price
  }));

  const orderData = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    email: formData.email,
    phone: formData.phone,
    city: formData.city,
    address: formData.address,
    total: totalCartPrice + deliveryPrice,
    orderItems: orderItems,
    user_id: userId,
    delivery_id: formData.delivery_id,
  };
  console.log(formData)
  axios.post('http://127.0.0.1:8000/api/AddOrder', orderData)
      .then(response => {
          console.log(response);
    nav('/store/checkout-3')
    setaddedorder(true)
    setisclient(true)
      })
      .catch(error => {
          console.error(error);
          setmessageError(error.response.data.error);

      });
};

useEffect(()=>{
  setinterface('infoclient')
},[])

const [delivery,setdelivery]=useState([])
    
useEffect(() => {
    fetchdel();
}, []);


const fetchdel = () => {
  axios.get('http://127.0.0.1:8000/api/getdelivery')
  .then(response => {
    setdelivery(response.data.delivery)
    console.log(response.data.delivery)
        })
        .catch(error => {
            console.error(error);
        });
};



const getClients = () => {
  axios.get(`http://127.0.0.1:8000/api/client?id=${userId}`)
 .then(response => {
   setClientdata(response.data.clientdata);        
   console.log(response);
 })
 .catch(error => {
     console.error(error);
 });
};

useEffect(()=>{
getClients()
},[])


  return (
    <>
  <Steper />
  <div className='checkout'>

    <div className='infoclient'>
        <form className='formclient'>
       <fieldset className='fieldset'>
       <span className='step-check'>1</span>

            <div className='inputs'>
            <div>
              <input name='user_id' hidden value={userId} />
              <input value={clientdata &&  clientdata.firstname} onChange={handleChange} className="input"  name='firstname' type='text' placeholder="Firstname" />
              {!clientdata && Errors.firstname && <span className='errorMessage'>{Errors.firstname} <i className='bx bxs-error'></i></span>} 
           
            </div>
            <div>
              <input value={ clientdata &&  clientdata.lastname}  onChange={handleChange} className="input"  name='lastname' type='text' placeholder="Lasttname" />
              { !clientdata && Errors.lastname && <span className='errorMessage'>{Errors.lastname} <i className='bx bxs-error'></i></span>} 
            
            </div>
            </div>
            <div className='inputs'>
            <div>
              <input value={clientdata && clientdata.email}   onChange={handleChange} className="input" name='email' type='text' placeholder="Email" />
              {!clientdata && Errors.email && <span className='errorMessage'>{Errors.email} <i className='bx bxs-error'></i></span>} 
            
            </div>
            <div>
              <input value={ clientdata && clientdata.phone}  onChange={handleChange} className="input"  name='phone' type='text' placeholder="Phone Number" />
              {!clientdata && Errors.phone && <span className='errorMessage'>{Errors.phone} <i className='bx bxs-error'></i></span>} 
            
            </div>
            </div>
            <div className='inputs'>
            <div>
              <input value={clientdata &&  clientdata.city} onChange={handleChange} className="input"  name='city' type='text' placeholder="City" />
              {!clientdata && Errors.city && <span className='errorMessage'>{Errors.city} <i className='bx bxs-error'></i></span>} 
            
            </div>
            <div>
              <input value={clientdata && clientdata.address} onChange={handleChange} className="input"  name='address' type='text' placeholder="Adress" />
              {!clientdata && Errors.adress && <span className='errorMessage'>{Errors.adress} <i className='bx bxs-error'></i></span>} 
            
            </div>
           
            </div>
{messageError && <Alert className='msgalertlogin' severity="error">{messageError}</Alert>}
       </fieldset>

       <fieldset   style={isclicked && formData.delivery_id === "" ? {border: '1px solid red'} : {}}  className='fieldset'>
        <span className='step-check'>2</span>
     <div className="centerdel">
  <h2>Delivery Options:</h2>
  <div className="delivery-options">
     {delivery.map((del)=>(
<>
<input onChange={handleChange} type="radio" value={del.id}  defaultValue="standard" id={del.name} name="delivery_id"/>
    <label htmlFor={del.name}>
      <h4>{del.name}</h4>
      <p>{del.delivery_time}</p>
      <div className="pricedel">$ {del.price}</div>
    </label>

</>

    ))}
  </div>
</div>

            
       </fieldset>
        </form>
    </div>

    <div className='cart-total'>
                                <div className='cart-total-head'>
                                    <h3>Total :</h3>
                                    <p>${totalCartPrice + deliveryPrice}</p>
                                </div>
                            {Cart.map((cart)=>(
                                    <div className='cartitems'>

                                    <div className="cartitem">

                                        <div className="cartimage">
                                            <span className='badgeitem'>{cart.quantity}</span>
                                            {cart.seller_id ? 
                   <img src={`http://127.0.0.1:8000/storage/store/collections/${cart.image}`} />
                  :
                                            <img src={`/store/Collections/${cart.image}`} alt />
              }
                                        </div>
                                        <div className="cartinfoitem">
                                            <h3>{cart.title}</h3>
                                            <p>category1</p>
                                            <p>${cart.price}</p>
                                        </div>

                                        <p className='priceitem'>${cart.total_price}</p>

                                    </div>
                               
                                </div>
                            ))}
                                <div className='btnscart'>
                                    <button onClick={handleback} className="btn-back">
                                        <span className="span">Back to cart</span>
                                    </button>
                                    <button onClick={AddOrder} className="btn-checkout">
                                        <span className="span">Continue </span>
                                    </button>
                                </div>
                            </div>

  </div>

                            </>
  )
}
