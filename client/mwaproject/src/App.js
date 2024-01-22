

import { useEffect, useState }  from "react";

import Register from "./components/register";

import "./App.css";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Dashboard from "./components/dashboard";


import Login from "./components/login";
import Readings from "./components/meterReading";
import Topup from "./components/topup";
import Admin from "./components/admin"


function App() {
 
   const [user, setUser] = useState({});

   useEffect(()=>{
    setUser(localStorage.getItem("MyUser"))
   },[])

   const updateUser = (user) =>{
    
     localStorage.setItem("MyUser",JSON.stringify(user))
     setUser(user) 
  }

  const [property_type, setPropertyType]=useState({});
  useEffect(()=>{
    setPropertyType(localStorage.getItem("PropertyType"))
  },[])
   const updatePropertyType=(property_type)=>{
    localStorage.setPropertyType("PropertyType", JSON.stringify(property_type))
    setPropertyType(property_type)
   }
  

  
  
  
  return (
    
    <div className="App">
      <Router>
        <Routes>
            <Route exact path="/" element =  {
            < Login updateUser = {updateUser} />}/>
            <Route exact path="/register" element = {< Register />}/>
            <Route exact path="/login" element = {< Login />}/>
            <Route exact path="/dashboard" element = {< Dashboard />}/>
            <Route exact path="/readings/new" element = {< Readings />}/>
            <Route exact path="/topup" element = {< Topup />}/>
            <Route exact path="/admin" element = {< Admin />}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
