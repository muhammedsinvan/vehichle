import React, {  useEffect, useState } from 'react'
import './VehichleMng.css';
import { useNavigate, useParams } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import axios from 'axios';

const AddVehichle = () => {

  const navigate = useNavigate();

  const params = useParams();

  const [baseImage1, setBaseImage1] = useState("");
  const [baseImage2, setBaseImage2] = useState("");
  const [baseImage3, setBaseImage3] = useState("");
  const [baseImage4, setBaseImage4] = useState("");

  const [data,setData] = useState([])

  console.log(data)


  const adminInfo = localStorage.getItem('admintoken')


  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };

 
    useEffect(()=>{
      if(adminInfo){
      if(params.id){
      (async()=>{
        try{
          let data = await axios.get(`/admin/getonevehichle/${params.id}`,config)
          setData(data.data)
          
        }catch(error){
          console.log(error)
        }
      })()
    }
  }else{
    navigate('/admin')
  }
},[])

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

  

  const validationSchema = Yup.object().shape({
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
  }).required()

  const {
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });


  const onsubmit = async(data) => {
      try{
        const newvehichle={
            name:data.name,
            description:data.description,
            manufactur:data.manufactur,
            model:data.model,
            price:data.price,
            qty:data.qty,
            image1:baseImage1,
            image2:baseImage2,
            image3:baseImage3,
            image4:baseImage4
        }
        console.log(newvehichle)
        const res = await axios.post('/admin/addvehichle',newvehichle)
        if(res.data){
          navigate('/admin/home')
       }
    }catch(err){
        console.log(err)
    }

};



  return (
<div className='addvehichle-container' >
        <div className='addvehichle-box'>
        
            <div className='addvehichle-box-title' >
                <h1>Add Vehichle</h1>
            </div>
<form onSubmit={handleSubmit(onsubmit)} >
            <div className='addvehichle-box-data'>
                <text>Vehichle Name</text>
                <input autoComplete='off'   {...register('name')}/> 

               {errors.name && <p className='register-error-message'>{errors.name.message}</p>}
            </div>
            <div className='addvehichle-box-data'>
                <text>Description</text>
                <input autoComplete='off' {...register('description')} /> 
                {errors.description && <p className='register-error-message'>{errors.description.message}</p>}
            </div>
            <div className='addvehichle-box-data'>
                <text>manufactur</text>
                <input autoComplete='off'  {...register('manufactur')} /> 
                {errors.manufactur && <p className='register-error-message'>{errors.manufactur.message}</p>}
            </div>
            <div className='addvehichle-box-data'>
                <text>Model</text>
                <input autoComplete='off'  {...register('model')} /> 
                {errors.model && <p className='register-error-message'>{errors.model.message}</p>}
            </div>
            <div className='addvehichle-box-data'>
                <text>Price</text>
                <input autoComplete='off' {...register('price')} /> 
                {errors.price && <p className='register-error-message'>{errors.price.message}</p>}
            </div>   
            <div className='addvehichle-box-data'>
                <text>Available Quantity</text>
                <input  autoComplete='off' {...register('qty')} /> 
                {errors.qty && <p className='register-error-message'>{errors.qty.message}</p>}
            </div>

            <div className='addvehichle-box-data'>
                <text>Image 1</text>
                <input type='file'  {...register('image1')} defaultValue={data.image1}  onChange={(e)=>{
                uploadImage1(e);
              }} />
              
              { errors.image1 && <p className='register-error-message'>{errors.image1.message}</p>} 
            </div>
            <div className='addvehichle-box-data'>
                <text>Image 2</text>
                <input type='file'  {...register('image2')} defaultValue={data.image2}   onChange={(e)=>{
                uploadImage2(e);
              }} />
              {errors.image2 && <p className='register-error-message'>{errors.image2.message}</p>} 
            </div>
            <div className='addvehichle-box-data'>
                <text>Image 3</text>
                <input type='file'  {...register('image3')} defaultValue={data.image3}  onChange={(e)=>{
                uploadImage3(e);
              }} />
              {errors.image3 && <p className='register-error-message'>{errors.image3.message}</p>} 
            </div>
            <div className='addvehichle-box-data'>
                <text>image 4</text>
                <input type='file'  {...register('image4')} defaultValue={data.image4}   onChange={(e)=>{
                uploadImage4(e);
              }} />

                { errors.image4 && <p className='register-error-message'>{errors.image4.message}</p>} 
            </div>

            <div className='addvehichle-box-button'>
                <button type='submit'>Add Vehichle</button>
            </div>
            </form>
        </div>

     

    </div>
  )
}

export default AddVehichle
