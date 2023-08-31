import React, { useEffect, useState } from 'react'; 
import './login.css';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Login = () => {
 
    const navigate = useNavigate();

    const[errorMessage,setErrorMessage] = useState('')

    const token = localStorage.getItem('admintoken')

    useEffect(()=>{
      if(token){
        navigate('/admin/home')
      }
      },[])
  

    const validationSchema = Yup.object().shape({
        email:Yup.string().required('Enter your email').email('Enter correct email'),
        password:Yup.string().required('Enter your password')
        .min(6,'Password must be atleast 6 characters')
        .max(8, 'Password must not exceed 8 characters')
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
        console.log(data)
        try{
          let res = await axios.post("/admin/signin",data)
          console.log(res.data)
          localStorage.setItem('admintoken',res.data.jsontoken)
          setErrorMessage('')
          navigate('/admin/home')
          
       }catch(error){
        setErrorMessage(error.response.data)
       }
    };

  return (
    <div className='admin_login-container'> 
    <form className='admin_login-box' onSubmit={handleSubmit(onsubmit)}  >
        <h1 className='admin_login-title'>Admin Panel</h1> 
    
        <div className='admin_login-field'>
        <p className='admin_login-error'>{errorMessage}</p> 
            <text>Email</text>
            <input type='text' {...register('email')} />
            {errors.email && <p className='register-error-message'>{errors.email.message}</p>}
            
        </div>

        <div className='admin_login-field'>
            <text>Password</text>
            <input type='password' {...register('password')}  />
            {errors.password && <p className='register-error-message'>{errors.password.message}</p>}
            
        </div>  

        <div className='admin_login-button'>
            <button> Login </button>  
        </div>
        <div className="adimin-login-forgot">
            <p onClick={()=> navigate('/admin/forgotpassword/email')}> Forgot your password?</p> 
        </div>
    </form>
   </div>
  )
}

export default Login
