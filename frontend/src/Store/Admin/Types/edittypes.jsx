

import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { SellerContext } from "../../../Context/Sellercontext";
import { AdminContext } from "../../../Context/AdminContext";

export default function EditTypes({onClose,typeId}) {
  const seller_id = localStorage.getItem('seller_id');
  console.log(typeId)
  
  const [data,setdata]=useState([])
  const [cats,setcats]=useState([])
  const [cat,setcat]=useState({})
  const { isadd, setisadd,isedit,setisedit}=useContext(AdminContext)
  
  const [formData, setFormData] = useState({
    cat_id: "",
    name: "",
  });

  const [errors, setErrors] = useState({
     
    name: "",
    cat_id: "",
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
    axios.get(`http://127.0.0.1:8000/api/edittype/${typeId}`)
      .then(response => {
        setFormData(response.data.type);
        setcats(response.data.categorys);
        setcat(response.data.category);
        console.log(response)
      })
      .catch(error => {
        console.error("Error fetching client data:", error);
      });
  }, [typeId]);


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
    .put(`http://127.0.0.1:8000/api/type/${typeId}`, formData)
    .then((response) => {
      console.log(response);
      setisedit(!isedit)
      onClose();
    })
    .catch((error) => {
      console.error(error);
      
    });
  
  };

//   useEffect(() => {
//     fetchdata();
//   }, []);


//   const fetchdata = () => {
//     axios.get('http://127.0.0.1:8000/api/showformcategory')
//       .then(response => {
//         setdata(response.data)
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

  return (
    <Fragment>
      <div className="parentModalAddFormation">
        <div className="modalAddFormation">
          <div className="headerModal">
            <h1>Edit Type of category</h1>
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
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name"
                      />
                    {errors.name && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.name}
                      </span>
                    )}
                  </td>
                  <td>
                    <select
                      name="cat_id"
                      className="input"

                      value={formData.cat_id}
                      onChange={(e) => setFormData({ ...formData, cat_id: e.target.value })}

                      placeholder="ID de Catégorie"
                    >
                      {cats && cats.map(category => (
      <option selected={cat.id === category.id} key={category.id} value={category.id}>
        {category.name}
      </option>
    ))}
                    </select>
                    {errors.category_id && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.category_id}
                      </span>
                    )}
                  </td>
                      </tr>
                      <tr>

                  <td>
                    <input type="submit" value="Edit type" className="modalbtn" />
                  </td>
                      </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
