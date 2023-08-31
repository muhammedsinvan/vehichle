import React ,{useState} from 'react'
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsopen] = useState(false);

    const navigate = useNavigate();

    const logout =()=>{
        localStorage.clear('admintoken')
        navigate('/admin')
    }

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }
  return (
    <>
    <div className="container-fluid mt-3">
        <div className='nav-container'>
            { isOpen ? <></>:<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-md"> 
                <div className="container-fluid p-2">
                    <a className="navbar-brand text-primary mr-0">VEHICHLE</a>
                    <div className="form-inline ml-auto">
                        <div className="btn btn-primary" onClick={ToggleSidebar} >
                            <i className="fa fa-bars"></i>
                        </div>
                    </div>
                </div>
            </nav>}
            </div>
            <div className={`sidebar ${isOpen == true ? 'active' : ''}`}>
                <div className="sd-header">
                    <h4 className="mb-0">VEHICHLE</h4>
                    <div className="btn btn-primary" onClick={ToggleSidebar}><i className="fa fa-times"></i></div>
                </div>
                <div className="sd-body">
                    <ul>
                        <li  onClick={() => navigate("/admin/home")} ><a className="sd-link">Show Vehichle</a></li> 
                        <li  onClick={() => navigate("/admin/addvehichle")}><a className="sd-link">Add Vehichle</a></li>
                        <li ><a className="sd-link">Catagory Management</a></li>
                        <li ><a className="sd-link">Show Admin</a></li>
                        <li ><a className="sd-link">Create Admin</a></li>
                        <li  onClick={logout}><a className="sd-link">Logout</a></li>
                    </ul>
                </div>
            </div>
            <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
   </div>
   
</>
  )
}

export default Navbar
