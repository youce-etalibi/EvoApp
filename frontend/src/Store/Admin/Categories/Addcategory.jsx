import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../../../Context/AdminContext";

export default function Addcat({ onClose }) {
  const [data, setdata] = useState([])
  const { isadd, setisadd } = useContext(AdminContext)

  const [formData, setFormData] = useState({
    name: "",

  });

  const [errors, setErrors] = useState({
    name: "",

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
      .post("http://127.0.0.1:8000/api/addcategory", formData)
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
    axios.get('http://127.0.0.1:8000/api/showformcat')
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
            <h1>Add Category</h1>
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
                </tr>
                
                <tr>
                  <td>
                  <button type="submit" className='modalbtn' >
            Add Category
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


