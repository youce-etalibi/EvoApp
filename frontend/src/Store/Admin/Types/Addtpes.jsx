import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../../../Context/AdminContext";

export default function Addtype({ onClose }) {
  const [data, setdata] = useState([])

  const { isadd, setisadd } = useContext(AdminContext)

  const [formData, setFormData] = useState({
    name: "",
    cat_id: "",

  });
  const [errors, setErrors] = useState({
    name: "",
    cat_id: "",

  });

  const handleChange = (e) => {

    const { name, value} = e.target;

    let error = "";
      setFormData({
        ...formData,
        [name]: value,
      });

      setErrors({
        ...errors,
        [name]: error,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { ...errors };

    for (const key in formData) {
      if (formData[key].trim() === "") {
        newErrors[key] = "Ce champ est obligatoire";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    axios
      .post("http://127.0.0.1:8000/api/addtype", formData)
      .then((response) => {
        setisadd(!isadd)
        console.log(response)
        onClose();
      })
      .catch((error) => {

        console.error(error);
      });
  };


  
  useEffect(() => {
    fetchdata();
  }, []);


  const fetchdata = () => {
    axios.get('http://127.0.0.1:8000/api/showformtypes')
      .then(response => {
        setdata(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (

    <Fragment>
      <div className="parentModalAddFormation">
        <div className="modalAddFormation">
          <div className="headerModal">
            <h1>Add Type</h1>
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
                      onChange={handleChange}
                      placeholder="Titre"
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
                      onChange={handleChange}
                      placeholder="ID de Catégorie"
                    >
                      <option value="" disabled selected>Select the category</option>
                      {data.categorys && data.categorys.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.cat_id && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.cat_id}
                      </span>
                    )}
                  </td>
                 
                </tr>

                <tr>
                <td>
                  <button type="submit" className='modalbtn' >
            Add Type
        </button>
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


