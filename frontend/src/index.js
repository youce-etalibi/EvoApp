import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {  MenuProvider } from './Context/MenuContext';
import { StepsProvider } from './Context/StepCheckoutcontext';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';
import { GoogleOAuthProvider } from "@react-oauth/google"
import { AuthProvider } from './Context/AuthContext';
import { OrderProvider } from './Context/OrderContext';
import { SellerProvider } from './Context/Sellercontext';
import { CaloriesProvider } from './Context/CaloriesContext';
import { AdminProvider } from './Context/AdminContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='1009282809407-sh8h2kgmot2q295a503sl5530pldnaj9.apps.googleusercontent.com'>
  <CaloriesProvider>
  <AuthProvider>
  <OrderProvider>
  <MenuProvider>
  <StepsProvider>
  <CartProvider>
  <WishlistProvider>
  <SellerProvider>
  <AdminProvider >
    <App />
  </ AdminProvider >
  </SellerProvider>
  </WishlistProvider>
  </CartProvider>
  </StepsProvider>
  </MenuProvider>
  </OrderProvider>
  </AuthProvider>
  </CaloriesProvider>

  </GoogleOAuthProvider>
);