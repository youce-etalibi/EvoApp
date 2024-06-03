import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token'); 

  if (token) {
    return <Navigate to="/home" />;
  }

  return element;
};

export default ProtectedRoute;
