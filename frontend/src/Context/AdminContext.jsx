import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {

    const [isadd,setisadd]=useState(false)
    const [isdelete,setisdelete]=useState(false)
    const [isedit,setisedit]=useState(false)

    return (

        <AdminContext.Provider value={{
            isedit,setisedit,isadd,setisadd,isdelete,setisdelete}}>
        {children}
        </AdminContext.Provider>

    )
}
