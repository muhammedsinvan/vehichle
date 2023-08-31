import React from 'react';
import './forget.css';
import { useNavigate,useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Password = () => {

    const {id,token} = useParams();

    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        password:Yup.string().required('Enter your password')
        .min(6,'Password must be atleast 6 characters')
        .max(8, 'Password must not exceed 8 characters'),
        confirmpassword:Yup.string().required('Enter your confirm password').oneOf([Yup.ref('password'), null], 'Passwords must match')
      }).required()

      const {
        register,
        handleSubmit, 
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      }
      );

      const onsubmit = async(data) => {
        try{
          let res = await axios.post(`/admin/newpassword/${id}/${token}`,{data});
          console.log(res.data)
          navigate('/admin')
       }catch(error){
        console.log(error.response)
       }
    };

  return (
    <div className='forget-container'> 
    <form className='forget-box' onSubmit={handleSubmit(onsubmit)} >
        <h1 className='forget-title'>Forgot Password</h1> 
    
        <div className='forget-field'>
       
            <text>Password</text>
            <input type='password' {...register('password')}  />
            {errors.password && <p className='register-error-message'>{errors.password.message}</p>}
            
            
        </div> 
        <div className='forget-field'>
       
       <text>Confirm Password</text>
       <input type='password' {...register('confirmpassword')}  />
            {errors.confirmpassword && <p className='register-error-message'>{errors.confirmpassword.message}</p>}
       
       
   </div> 

        <div className='forget-button'>
            <button> Submit </button>  
        </div>
    </form>
   </div>
  )
}

export default Password
