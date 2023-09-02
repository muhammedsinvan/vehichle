import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "./VehichleMng.css";
import { useFormik } from "formik";
import * as Yup from 'yup';

const EditVehichle = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  
  console.log(data);


  const adminInfo = localStorage.getItem("admintoken");

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };

  const [baseImage1, setBaseImage1] = useState("");
  const [baseImage2, setBaseImage2] = useState("");
  const [baseImage3, setBaseImage3] = useState("");
  const [baseImage4, setBaseImage4] = useState("");


  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage1 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage1(base64);
  };

  const uploadImage2 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage2(base64);
  };

  const uploadImage3 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage3(base64);
  };

  const uploadImage4 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage4(base64);
  };

  useEffect(() => {
    (async () => {
      try {
        let data = await axios.get(
          `/admin/getonevehichle/${params.id}`,
          config
        );
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const { handleSubmit, errors, getFieldProps } = useFormik({
    initialValues: {
        name:data.name,
        description:data.description,
        manufactur:data.manufactur,
        model:data.model,
        price:data.price,
        qty:data.qty,
        image1:data.image1,
        image2:data.image2,
        image3:data.image3,
        image4:data.image4
    },
    enableReinitialize: true,

   validationSchemas : Yup.object({
    name:Yup.string().required('Enter the vehichle name'),
    description:Yup.string().required('Enter the vehichle description'),
    manufactur:Yup.string().required('Enter the manufactur'),
    model:Yup.string().required('Enter the model'),
    price:Yup.string().required('Enter the price'),
    qty:Yup.string().required('Enter the quantity'),
    image1:Yup.mixed()
        .test('required','Uplod the image', value =>{
          return value && value.length;
        }),
    image2:Yup.mixed()
        .test('required','Uplod the image', value =>{
          return value && value.length;
        }),
    image3:Yup.mixed()
        .test('required','Uplod the image', value =>{
          return value && value.length;
        }),
    image4:Yup.mixed()
        .test('required','Uplod the image', value =>{
          return value && value.length;
        })
  }).required(),
  onSubmit: values => {
    (async()=>{
      try{
        const updatevehichle = {
          name:values.name,
          description:values.description,
          manufactur:values.manufactur,
          model:values.model,
          price:values.price,
          qty:values.qty,
          image1:baseImage1?baseImage1:values.image1,
          image2:baseImage2?baseImage2:values.image2,
          image3:baseImage3?baseImage3:values.image3,
          image4:baseImage4?baseImage4:values.image4,
        }
        const res = await axios.post(`/admin/updatevehichle/${params.id}`,updatevehichle)
        console.log(res.data)
        if(res.data){
          navigate('/admin/home')
       }
      }catch(error){
        console.log(error)
      }
    })()
}
});
  return (
    <div className="addvehichle-container">
       
          <div className="addvehichle-box">
            <div className="addvehichle-box-title">
              <h1>Edit Vehichle</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="addvehichle-box-data">
                <text>Vehichle Name</text>
                <input
                  type="text"
                  {...getFieldProps('name')}
                  autoComplete="off"
                />
                {console.log(errors)}
                 {errors.name && <p className="register-error-message">{errors.name.message}</p>}
              </div>
              <div className="addvehichle-box-data">
                <text>Description</text>
                <input
                  type="text"
                  {...getFieldProps('description')}
                  autoComplete="off"
                />
              </div>
              <div className="addvehichle-box-data">
                <text>manufactur</text>
                <input
                  type="text"
                  {...getFieldProps('manufactur')}
                  autoComplete="off"
                />
              </div>
              <div className="addvehichle-box-data">
                <text>Model</text>
                <input
                  type="text"
                  {...getFieldProps('model')}
                  autoComplete="off"
                />
              </div>
              <div className="addvehichle-box-data">
                <text>Price</text>
                <input
                  type="text"
                  {...getFieldProps('price')}
                  autoComplete="off"
                />
              </div>
              <div className="addvehichle-box-data">
                <text>Available Quantity</text>
                <input
                  type="text"
                  {...getFieldProps('qty')}
                  autoComplete="off"
                />
              </div>

              <div className="addvehichle-box-data">
                <text>Image 1</text>
                <input
                  type="file"
                  
                  onChange={(e)=>{
                    uploadImage1(e);
                  }}
                />
                 {baseImage1?<img src={baseImage1} alt="img"/>:<img src={data.image1} alt="img"/>}
              </div>
              <div className="addvehichle-box-data">
                <text>Image 2</text>
                <input
                 type="file"
                 onChange={(e)=>{
                  uploadImage2(e);
                }}
                />
                                  {baseImage2?<img src={baseImage2} alt="img"/>:<img src={data.image2} alt="img"/>}
              </div>
              <div className="addvehichle-box-data">
                <text>Image 3</text>
                <input
                   type="file"
                   onChange={(e)=>{
                    uploadImage3(e);
                  }}
               
                />
                                  {baseImage3?<img src={baseImage3} alt="img"/>:<img src={data.image3} alt="img"/>}
              </div>
              <div className="addvehichle-box-data">
                <text>image 4</text>
                <input
                  type="file"
                  onChange={(e)=>{
                    uploadImage4(e);
                  }}
                />
                                {baseImage4?<img src={baseImage4} alt="img"/>:<img src={data.image4} alt="img"/>}
              </div>

              <div className="addvehichle-box-button">
                <button type="submit">Update Vehichle</button>
              </div>
            </form>
          </div>
    </div>
  );
};

export default EditVehichle;

//https://dev.to/franklin030601/dynamic-forms-with-formik-and-react-js-3no1