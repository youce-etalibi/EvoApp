import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, IconButton } from '@mui/material';
import { AdminContext } from '../../../Context/AdminContext';

export const Sellers = () => {

  const [sellers, setsellers] = useState([]);
  const [publishStatus, setPublishStatus] = useState({});

  const { isdelete, setisdelete } = useContext(AdminContext);

  const getSellers = () => {
    axios.get(`http://127.0.0.1:8000/api/getSellers`)
      .then(response => {
          const initialStatus = {};
          response.data.sellers.forEach(seller => {
              initialStatus[seller.id] = seller.show_publish;
            });

            const formattedSellers = response.data.sellers.map(seller => ({
                ...seller,
                plan_start_date: new Date(seller.plan_start_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            }));
            setsellers(formattedSellers);
        setPublishStatus(initialStatus);
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getSellers();
  }, [isdelete]);

  const deleteSeller = async (id) => {
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/api/deleteSeller/${id}`);
      console.log(res);
      setisdelete(!isdelete);
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  };

  const handleToggle = async (seller_id) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/toggle-publish', { id: seller_id });
      if (response.data.success) {
        setPublishStatus(prevStatus => ({
          ...prevStatus,
          [seller_id]: response.data.show_publish
        }));
      } else {
        console.error('Failed to toggle publish status');
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  return (
    <div id='productStoreseller'>
      <table className='tablecrudseller'>
        <thead className='theadseller'>
          <tr className='trseller'>
            <th>Seller</th>
            <th>Package Name</th>
            <th>Package start_at</th>
            <th>Shop Publish</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {sellers.map((res, index) => (
            <tr className='trseller' key={index}>
              <td>
                <div  className='avatarseller'>

                <div>
                <Avatar sx={{ width: 40, height: 40 }}>
                    {res.nameseller.charAt(0).toUpperCase()}
                </Avatar>
                </div>
<div>
<p>{res.nameseller}</p>
<p>{res.phoneseller}</p>
</div>
                </div>
              </td>
              <td>
                {res.plan.plan_type.name}
              </td>
              <td>
                {res.plan_start_date}
              </td>
              <td>
                <label className="switch">
                  <input type="checkbox" checked={publishStatus[res.id] || false} onChange={() => handleToggle(res.id)} />
                  <div className="slider">
                    <div className="circle">
                      <svg className="cross" xmlSpace="preserve" viewBox="0 0 365.696 365.696" height={6} width={6} xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <path data-original="#000000" fill="currentColor" d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0" />
                        </g>
                      </svg>
                      <svg className="checkmark" xmlSpace="preserve" viewBox="0 0 24 24" height={10} width={10} xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <path data-original="#000000" fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </label>
              </td>
             
              <td>
                <div className='quantityseller'>
                  <button onClick={() => deleteSeller(res.id)}>
                    <IconButton aria-label="hide">
                      <span className="span"><i className='bx bx-trash'></i></span>
                    </IconButton>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
