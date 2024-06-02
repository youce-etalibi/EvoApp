import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../Context/AdminContext";

export const Updateclient = ({clientId,onClose}) => {
    
    const [data,setdata]=useState({})
    const { isadd, seisadd,isedit,setisedit}=useContext(AdminContext)
    const [formData, setFormData] = useState({
      email:'',
    });
  
    const [errors, setErrors] = useState({
        email: "",
    });
  
    const handleChange = (e) => {
      const { name, value} = e.target;
  
      let error = "";
  
        if (value.trim() === "") {
          error = "Ce champ est obligatoire";
        }
        setFormData({
          ...formData,
          [name]: value,
        });
  
      setErrors({
        ...errors,
        [name]: error,
      });
    };
  
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/editclient/${clientId}`)
          .then(response => {
            setFormData(response.data.client)
            console.log(response)
          })
          .catch(error => {
            console.error("Error fetching client data:", error);
          });
      }, [clientId]);
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = {};

    for (const key in formData) {
      if (typeof formData[key] === 'string' && formData[key].trim() === "") {
        newErrors[key] = "Ce champ est obligatoire";
        isValid = false;
      }
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    
    axios
    .put(`http://127.0.0.1:8000/api/client/${clientId}`, formData)
    .then((response) => {
      console.log(response);
      setisedit(!isedit)
      onClose();
    })
    .catch((error) => {
      console.error(error);
    });
  
  };
  console.log(formData)
  return (
    <Fragment>
      <div className="parentModalAddFormation">
        <div className="modalAddFormation">
          <div className="headerModal">
            <h1>Edit Client</h1>
            <button onClick={onClose}>
              <i className="bx bx-x"></i>
            </button>
          </div>
          <form className="addproductsform" onSubmit={handleSubmit}>
            <table cellSpacing="15">
              <tbody>
                <tr>
                  <td>
                    <input
                      className="input"
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email"
                      />
                    {errors.name && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.name}
                      </span>
                    )}
                  </td>
                  <td>
                    <input type="submit" value="Edit Client" className="modalbtn" />
                  </td>
                      </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </Fragment>
  )
}
