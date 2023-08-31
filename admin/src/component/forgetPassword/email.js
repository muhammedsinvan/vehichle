import React, { useEffect, useState } from 'react';
import './forget.css';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Email = () => {

  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [buttons,setButtons] = useState(false);
  const [message,setMessage] = useState('')


  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          setButtons(false);
          setMessage("")
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = () => {
    setMinutes(1);
    setSeconds(59);
  };

    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email:Yup.string().required('Enter your email').email('Enter correct email')
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
          let res = await axios.post("/admin/checkmail",data)
          if(res.data){
            setButtons(true)
            resendOTP()
            setMessage('Email sended successfully')
          }
          
       }catch(error){
        console.log(error.response)
       }
    };


    

  return (
    <div className='forget-container'> 
    <form className='forget-box' onSubmit={handleSubmit(onsubmit)}  >
        <h1 className='forget-title'>Forgot Password</h1> 
    
    {message&&<p className='forget-message'>{message}</p>}
        <div className='forget-field'>
       
            <text>Email</text>
            <input type='text' {...register('email')} />
            {errors.email && <p className='register-error-message'>{errors.email.message}</p>}
            
        </div> 

      {buttons ?<p className='forget-timmer'>
              Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p> : <></>}

        <div className='forget-button'>
            {buttons?<button className='no-click'> Sent mail </button> : <button> Sent mail </button> }
        </div>
    </form>
   </div>
  )
}

export default Email
