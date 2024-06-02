import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import { Storeparent } from "../Store/Storeparent";
import { Productdetail } from "../Store/ProductDetail/Productdetail";
import { ProductsShop } from "../Store/Shop/Shop";
import { Navbar } from "../Store/Navbar/Navbar";
import { CartTable } from "../Store/Cart/CartTable/CartTable";
import { Infoclient } from "../Store/Cart/InfoClient/Infoclient";
import { Reviews } from "../Store/Cart/Reviews/Reviews";
import { Dashboard } from "../Store/Dashboard/Dashboard";
import { Orders } from "../Store/Dashboard/Orders/Orders";
import { Wishlist } from "../Store/Dashboard/Wishlist/Wishlist";
import RequiredAuth from "./requiredAuth";
import { SellerAuth } from "../Store/SellerAuth/SellerAuth";
import { Register } from "../Store/SellerAuth/Register/Register";
import { LoginSeller } from "../Store/SellerAuth/Login/Login";
import { Plan } from "../Store/Seller/Plan/plan";
import RequiredSeller from "../Store/SellerAuth/RequiredSeller";
import ModalAddProduct from "../Store/Seller/AddProducts/Addproducts";
import { HomeSeller } from "../Store/Seller/Homeseller/Homeseller";
import Sellersidebar from "../Store/Seller/Sellerprofile/Sidebarseller/Sidebaseller";
import { Sellerprofile } from "../Store/Seller/Sellerprofile/SellerProfile/Sellerprofile";
import { Sellerproducts } from "../Store/Seller/Sellerprofile/Sellerproducts/Sellerproducts";

// import CaloriesCalculatorMain from "../CaloriesCalCulator/Home/CaloriesCalculatorMain";
// import ChangeGoal from "../CaloriesCalCulator/ChangeGoal/ChangeGoal";
// import CaloriesCalCulator from "../CaloriesCalCulator/CaloriesCalCulator";

import Home from "../Home/home";

import Categories from "../Exercices/categories/categories";
import Profile from "../Exercices/Profile/profile";
import ExercicesList from "../Exercices/exercicesList/exercicesList";
import Workouts from "../Exercices/workouts/workouts";
import Exercices from "../Exercices/exercices";

import Auth from "../Auth/auth";
import Login from "../Auth/login/login";
import Signup from "../Auth/signup/signup";
import Unfounded from "../Unfounded/Unfounded";
import { Admin } from "../Store/Admin/Admin";
import ScrollToTopButton from "../Components/ScrollTopButton/scrolTopBtn";
import SettingsProfile from "../SettingsProfile/settingsProfile";
import ChangeGoal from "../CaloriesCalCulator/ChangeGoal/ChangeGoal";
import CaloriesCalCulator from "../CaloriesCalCulator/CaloriesCalCulator";
import CaloriesCalculatorMain from "../CaloriesCalCulator/Home/CaloriesCalculatorMain";
import axios from "axios";
// import SellerHome from "../SellerHome/SellerHome";

export default function RouterApp() {
  const token = localStorage.getItem("token");
  const idAuth = localStorage.getItem("id_active");



  const [caloriesUser, setcaloriesUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/calories-users/?id=${idAuth}`);
        setcaloriesUser(response.data.macros_consumed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [idAuth]); 

  return (
    <Fragment>
      <BrowserRouter>
        <ScrollToTopButton />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route element={<RequiredAuth />}>

            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<SettingsProfile />} />
            <Route path="/exercices" element={<Exercices />}>
              <Route path="overview" element={<Categories />} />
              <Route path="profile" element={<Profile />} />
              <Route path="list" element={<ExercicesList />} />
              <Route path="my-workouts" element={<Workouts />} />
            </Route>


            <Route path="/CaloriesCalculator" element={<CaloriesCalCulator />} />
            <Route path="/CaloriesCalculator/change-goal" element={<ChangeGoal />} />
            <Route path="/CaloriesCalculator/Home" element={<CaloriesCalculatorMain />} />

            <Route path="/store/seller-auth" element={<SellerAuth />}>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<LoginSeller />} />
            </Route>

            <Route
              path="/store"
              element={
                <Fragment>
                  <Navbar />
                  <Storeparent />
                </Fragment>
              }
            />
            <Route
              path="/store/productdetail/:id"
              element={
                <Fragment>
                  <Navbar />
                  <Productdetail />
                </Fragment>
              }
            />
            <Route
              path="/store/shop"
              element={
                <Fragment>
                  <Navbar />
                  <ProductsShop />
                </Fragment>
              }
            />
            <Route
              path="/store/shop-mens"
              element={
                <Fragment>
                  <Navbar />
                  <ProductsShop gender="Men" />
                </Fragment>
              }
            />
            <Route
              path="/store/shop-womens"
              element={
                <Fragment>
                  <Navbar />
                  <ProductsShop gender="Women" />
                </Fragment>
              }
            />
            <Route
              path="/store/checkout-1"
              element={
                <Fragment>
                  <Navbar />
                  <CartTable />
                </Fragment>
              }
            />
            <Route
              path="/store/checkout-2"
              element={
                <Fragment>
                  <Navbar />
                  <Infoclient />
                </Fragment>
              }
            />
            <Route
              path="/store/checkout-3"
              element={
                <Fragment>
                  <Navbar />
                  <Reviews />
                </Fragment>
              }
            />

            <Route
              path="/store/profile"
              element={
                <Fragment>
                  <Navbar />
                  <Dashboard />
                </Fragment>
              }
            >
              <Route path="orders" element={<Orders />} />
              <Route path="wishlists" element={<Wishlist />} />
            </Route>

            <Route element={<RequiredSeller />}>
              <Route
                path="/store/package"
                element={
                  <Fragment>
                    <Navbar />
                    <Plan />
                  </Fragment>
                }
              />
              <Route
                path="/store/seller"
                element={
                  <Fragment>
                    <Navbar />
                    <HomeSeller />
                  </Fragment>
                }
              />
              <Route
                path="/store/seller/profileseller"
                element={
                  <Fragment>
                    <Navbar />
                    <Sellerprofile />
                  </Fragment>
                }
              />
              <Route
                path="/store/seller/products"
                element={
                  <Fragment>
                    <Navbar />
                    <Sellerproducts />
                  </Fragment>
                }
              />
            </Route>

            <Route
              path="/store/admin"
              element={
                <Fragment>
                  <Admin />
                </Fragment>
              }
            />

            {/* <Route path="/CaloriesCalculator" element={<CaloriesCalCulator />} />
                        <Route path="/CaloriesCalculator/change-goal" element={<ChangeGoal />} />
                        <Route path="/CaloriesCalculator/Home" element={<CaloriesCalculatorMain />} />
                        <Route path="/sellerHome" element={<SellerHome />} /> */}
          </Route>

          <Route path="*" element={<Unfounded />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}
