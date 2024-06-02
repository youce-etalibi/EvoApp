import { IconButton } from '@mui/material';
import React from 'react';
import './Salleproducts.css'
export const Salleproducts = ({ salleproducts }) => {
  console.log(salleproducts)
  return (
    <div className="prod-table">
        <div className='header-table'>
<h4>Top Selling products</h4>
 
    <IconButton  aria-label="show cart">
 <i className='bx bx-right-arrow-alt' id="arrowSideBarSeller"></i>
</IconButton>
        </div>
      <table className='tableseller'>
        <thead>
          <tr >
            <th>Product</th>
            <th>Price</th>
            <th>total_quantity</th>
            <th>earnings</th>
          </tr>
        </thead>
        <tbody>
          {salleproducts.slice(0, 3).map((prod, index) => (
            <tr key={index}>
              <td className='tdseller'>
                <div className="imagetableseller">
                  <span className='badgecount'>{prod.count}</span>
                  <img src={`http://127.0.0.1:8000/storage/store/collections/${prod.product.image}`} />

                  <span>{prod.title}</span>
                </div>
              </td>
              <td>${prod.product.price}</td>
              <td>{prod.total_quantity}</td>
              <td>${prod.total_earnings}</td>
            </tr>
          ))}
         
        </tbody>
      </table>
    </div>
  );
};
