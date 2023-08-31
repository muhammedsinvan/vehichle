import './App.css'
import {Route,Routes} from 'react-router-dom';
import Login from "./component/login/login";
import ShowVehicle from './page/showVehicle';
import AddVehichle from './page/addVehichle';
import Email from './component/forgetPassword/email';
import Password from './component/forgetPassword/password';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/admin' element={<Login />}/>
        <Route path='/admin/home' element={<ShowVehicle />}/>
        <Route path='/admin/addvehichle' element={<AddVehichle />}/>
        <Route path='/admin/editvehichle/:id' element={<AddVehichle />}/>
        <Route path='/admin/forgotpassword/email' element={<Email />}/>
        <Route path='/admin/forgotpassword/password/:id/:token' element={<Password />}/>
      </Routes>
        
    
    </div>
  );
}

export default App;
