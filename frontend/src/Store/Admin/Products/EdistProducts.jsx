import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { SellerContext } from "../../../Context/Sellercontext";
import { AdminContext } from "../../../Context/AdminContext";

export default function EditProduct({ productId, onClose }) {
  const seller_id = localStorage.getItem('seller_id');
  console.log(productId)
  const [data,setdata]=useState([])
  const {isedit,setisedit}=useContext(AdminContext)
  const [formData, setFormData] = useState({
    title: "",
    sub_description: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    category_id: "",
    gender_id: "",
    type_id: "",
  });
  const [profilePreview, setProfilePreview] = useState();


  const [errors, setErrors] = useState({
    title: "",
    sub_description: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    category_id: "",
    gender_id: "",
    type_id: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    let error = "";

    if (value.trim() === "") {
      error = "Ce champ est obligatoire";
    }


    if (type === "file") {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file, 
      });
  
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (name === "image") {
            setProfilePreview(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      if (value.trim() === "") {
        error = "Ce champ est obligatoire";
      }
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/product/${productId}`)
      .then(response => {
        setFormData(response.data.product);
        console.log(response)
      })
      .catch(error => {
        console.error("Error fetching client data:", error);
      });
  }, [productId]);


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
    .put(`http://127.0.0.1:8000/api/product/${productId}`, formData)
    .then((response) => {
      console.log(response);
      setisedit(!isedit)
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
    axios.get('http://127.0.0.1:8000/api/showformproduct')
      .then(response => {
        setdata(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  };
  console.log(profilePreview)

  return (
    <Fragment>
      <div className="parentModalAddFormation">
        <div className="modalAddFormation">
          <div className="headerModal">
            <h1>Edit product</h1>
            <button onClick={onClose}>
              <i className="bx bx-x"></i>
            </button>
          </div>
          <form className="addproductsform" onSubmit={handleSubmit}>
            <table cellSpacing="15">
              <tbody>
                <tr>
                  <td>
                    <input type="text" hidden onChange={handleChange} value={formData.seller_id} />
                    <input
                      className="input"

                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Titre"
                    />
                    {errors.title && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.title}
                      </span>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input"

                      name="sub_description"
                      value={formData.sub_description}
                      onChange={(e) => setFormData({ ...formData, sub_description: e.target.value })}
                      placeholder="Sous-description"
                    />
                    {errors.sub_description && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.sub_description}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      className="input"

                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description"
                    />
                    {errors.description && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.description}
                      </span>
                    )}
                  </td>
                  <td>
                    <input
                      className="input"

                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}

                      placeholder="Prix"
                    />
                    {errors.price && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.price}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                 
                  <td colSpan={2}>
                  <label class="custum-file-upload" for="file">
<div class="icon">
<svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
</div>
<div class="text">
{profilePreview ? 
  <span>
   {formData.image}
    </span> :
   <span>{formData.image}</span>
                        }
   </div>
   <input type="file"
     onChange={(e) => setFormData({ ...formData, image: e.target.value })}
    
    id="file" />
</label>

{errors.image && (
  <span className="errorModal">
    <i className="bx bxs-error"></i> {errors.image}
  </span>
)}
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      className="input"

                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}

                      placeholder="Stock"
                    />
                    {errors.stock && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.stock}
                      </span>
                    )}
                  </td>
                  <td>
                    <select
                      name="category_id"
                      className="input"

                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}

                      placeholder="ID de Catégorie"
                    >
                      <option value="" disabled selected>Select the category</option>
                      {data.categories && data.categories.map(category => (
      <option key={category.id} value={category.id}>
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
                    <select
                      name="gender_id"
                      className="input"

                      value={formData.gender_id}
                      onChange={(e) => setFormData({ ...formData, gender_id: e.target.value })}

                      placeholder="ID de gender"
                    >
                      <option value="" disabled selected>Select the gender</option>
                      {data.genders && data.genders.map(gender => (
      <option key={gender.id} value={gender.id}>
        {gender.name}
      </option>
    ))}
                    </select>
                    {errors.gender_id && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.gender_id}
                      </span>
                    )}
                  </td>
                  <td>
                    <select
                      name="type_id"
                      className="input"

                      value={formData.type_id}
                      onChange={(e) => setFormData({ ...formData, type_id: e.target.value })}

                      placeholder="ID de type"
                    >
                      <option value="" disabled selected>Select the type</option>
                      {data.types && data.types.map(type => (
      <option key={type.id} value={type.id}>
        {type.name}
      </option>
    ))}
                    </select>
                    {errors.type_id && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.type_id}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <input type="submit" value="Edit product" className="modalbtn" />
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
