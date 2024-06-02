    import { useContext, useEffect, useState } from "react";
    import { Navigate, Outlet, } from "react-router-dom";
    export default function RequiredAuth() {

       const token = localStorage.getItem('token');
       return token  ? <Outlet /> : <Navigate to='auth/login' /> ;
    }
