import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {  MenuContext, MenuProvider } from './Context/MenuContext';
import { StepsProvider } from './Context/StepCheckoutcontext';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';
import { GoogleOAuthProvider } from "@react-oauth/google"
import { AuthProvider } from './Context/AuthContext';
import { OrderProvider } from './Context/OrderContext';
import { SellerProvider } from './Context/Sellercontext';
import { CaloriesProvider } from './Context/CaloriesContext';
import { AdminProvider } from './Context/AdminContext';
import { Menu } from './Components/Menu/Menu';
import { FavoriteProvider } from './Context/FavoriteContext';
import { ExerciseProvider } from './Context/ExerciseContext';
import { WorkoutsProvider } from './Context/WorkoutsContext';



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
  <FavoriteProvider>
  <ExerciseProvider>
  <WorkoutsProvider>
    <App />
  </WorkoutsProvider>
  </ExerciseProvider>
  </FavoriteProvider>
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