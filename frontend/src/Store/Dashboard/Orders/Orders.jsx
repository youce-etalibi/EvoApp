import React, { useContext, useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { CartContext } from '../../../Context/CartContext';
import { WishlistContext } from '../../../Context/WishlistContext';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { OrderContext } from '../../../Context/OrderContext';

export const Orders = () => {
  const { setorderssCount, orderssCount, orderss } = useContext(OrderContext);

  const [Showorderss, setShoworderss] = useState(true);

  const handleShoworderss = (orderId) => {
    setShoworderss(Showorderss === orderId ? !Showorderss : !Showorderss);
  };

  const createdAtDate = new Date();

  const getdeliveryTime = orderss.map((ord) => ord.delivery.id);

  // Assuming you have delivery times as an array
  const deliveryTimes = getdeliveryTime.map((time) => parseInt(time)); // Parse delivery times as integers

  // Function to calculate the percentage based on time passed since creation
  const calculatePercentage = (deliveryTime) => {
    const currentTime = new Date();
    const timeDiff = Math.abs(currentTime - createdAtDate); // Difference in milliseconds
    const hoursPassed = Math.floor(timeDiff / (1000 * 60 * 60)); // Convert milliseconds to hours
    if (hoursPassed >= 0) {
      if (deliveryTime === 1) {
        return Math.min(20 + (hoursPassed * (70 / 24)), 100); // Increase by 70% every 24 hours, capped at 100%
      } else if (deliveryTime === 3) {
        return Math.min(40 + (hoursPassed * (60 / 24)), 100); // Increase by 60% every 24 hours, capped at 100%
      } else if (deliveryTime === 2) {
        return Math.min(70 + (hoursPassed * (30 / 24)), 100); // Increase by 30% every 24 hours, capped at 100%
      }
    }
    return 0; // Default case
  };

  const percentages = deliveryTimes.map((time) => calculatePercentage(time));

  return (
    <div>
      {orderssCount > 0 ? (
        <div className='titledashboard'>
          <h2 className='titledashboard'>
            <i id='shopingCart' className='bx bx-shopping-bag'></i> My Orders
          </h2>
        </div>
      ) : (
        <div className='emptyorder'>
          <img src="/store/emptyorder.png" alt="" />
          <div className='orderempty-text'>
            <h4>No orders yet</h4>
            <p>Looks like you haven't made a choice yet!</p>
            <Link to='/store/shop'>
              <button className='viewcartbtn-order'>Start shopping</button>
            </Link>
          </div>
        </div>
      )}

      {orderss.map((ord) => (
        <div key={ord.id} className='review-items-parent'>
          <div className="reviweitem">
            <p>#Order{ord.id}</p>
            <div className="statu">
              <span>{ord.status}</span>
            </div>
            <div className="date">
              <span>{ord.created_at}</span>
            </div>
            
            <div className="collapse-order">
              <IconButton onClick={() => handleShoworderss(ord.id)}>
                {Showorderss ? (
                  <i className='bx bx-collapse-vertical'></i>
                ) : (
                  <i className='bx bx-collapse-horizontal'></i>
                )}
              </IconButton>
            </div>
          </div>
          <div className="dateExp">
            <div className="range">
              <div
                className="fill"
                style={{
                  width: `${percentages[ord.delivery.id - 1]}%` // Accessing percentage for the corresponding delivery time
                }}
              ></div>
            </div>
          </div>

          {Showorderss && (
            <div className='itemsOrder'>
              {ord.items.map((item, index) => (
                <div key={index} className='order-item'>
                  <Link to={`/store/productdetail/${item.product.id}`}>
                    <div className="image">
                <img src={item.product.seller_id ? `http://127.0.0.1:8000/storage/store/collections/${item.product.image}`:`/store/Collections/${item.product.image}`} />
                    </div>
                  </Link>
                  <div className='order-content'>
                    <div className="detail-order-item">
                      <p><span>Product:</span> {item.product.title}</p>
                      <p><span>Category:</span> {item.product.category}</p>
                      <p><span>Price:</span> {item.product.price}</p>
                      <p><span>Quantity:</span> {item.quantity}</p>
                    </div>
                    <div className="price">${item.price}</div>
                  </div>
                </div>
              ))}
              <div className='totalPrice'>
                <div className="">
                  <p>Shipping:</p>
                  Total:
                </div>
                <div className="price">
                  <p>${ord.delivery.price}</p>
                  <span>${ord.total_amount}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
