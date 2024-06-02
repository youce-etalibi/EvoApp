    import { useContext, useEffect, useState } from "react";
    import { Navigate, Outlet, } from "react-router-dom";

    export default function RequiredSeller() {

       const seller_id = localStorage.getItem('seller_id');
       const isSeller =  localStorage.getItem('isSeller', true);

    return isSeller ?  <Outlet /> :  <Navigate to='/store/seller-auth/login' />;
    }
