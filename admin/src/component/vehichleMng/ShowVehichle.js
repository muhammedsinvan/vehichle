import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './VehichleMng.css'
import { useNavigate } from 'react-router-dom'

const ShowVehichle = () => {

  const navigate = useNavigate();

  const [data,setData] = useState([])

  const [refresh,setRefresh] = useState(true)

  const adminInfo = localStorage.getItem('admintoken')

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };

  useEffect(()=>{
    if(!adminInfo){
      navigate('/admin')
    }else{
    (async()=>{
      try{
        let res = await axios.get('/admin/getallvehichle',config);
        console.log(res)
        setData(res.data)
      }catch(error){
        console.log(error)
      }
    })()
  }
  },[refresh])

  const deletevehichle =async(id)=>{
    try{
      let res = await axios.post(`/admin/deletevehichle/${id}`)
      setRefresh(!refresh)
      console.log(res)
    }catch(error){
      console.log(error)
    }
  }  

  const editvehichle =(id)=>{
    navigate(`/admin/editvehichle/${id}`);
  }


  const filter = async (type)=>{
    try{
      let res = await axios.get(`/admin/getfilter/${type}`,config)
      setData(res.data)
    }catch(error){
      console.log(error)
    }
  }
  

  const search = async (val)=>{
    try{
      const res = await axios.get(`/admin/getsearch/${val}`,config)
      setData(res.data)
    }catch(error){
      console.log(error)
    }
  }
  
  
  return (
    <div className='showvehichle-container'>
    <div className='showvehichle-box'>
    <div className='showvehichle-box-filter'>
                <text>Filter</text>
                <select  onChange={e => filter(e.target.value)} className='showvehichle-box-filterdropdwon' >
                   <option hidden>SELECT</option>
                    <option value="nameaz"> Vehichle Name(a-z)</option>
                    <option value="nameza"> Vehichle Name(z-a)</option>
                    <option value="pricelow"  >Vehichle Price(low-high)</option>
                    <option value="pricehigh"  >Vehichle Price(high-low)</option>
                </select>

            </div> 
      <h1 className='showvehichle-title'>VEHICHLE</h1>
      <div className='showvehichle-search'>
      <input onChange={e => search(e.target.value)} />
      <button>search</button>
      </div>
    
<div className='showvehichle-divtable'>
<table className='showvehichle-table' id="myTable">
<thead>
<tr>
  <th>Image</th>
  <th>Vehichle Name</th>
  <th>Description</th>
  <th>Manufacture</th>
  <th>Model</th>
  <th>Price</th>
  <th>Available Quantity</th>
  <th>Action</th>
</tr>
</thead>
<tbody>
  
{data.map((item,index)=>(
        <tr>
        <td>
          <img src={item.image1} alt='productimg' />
        </td>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.manufactur}</td>
        <td>{item.model}</td>
        <td>{item.price}</td>
        <td>{item.qty}</td>
        <td>
          <button onClick={ e =>editvehichle(e.target.value)}  value={item._id}>Edit</button>
          <button onClick={ e => deletevehichle(e.target.value)} value={item._id}>Delete</button>
        </td>
      </tr>
    ))}


</tbody>
</table>

</div>

    </div>

  </div>
  )
}

export default ShowVehichle
