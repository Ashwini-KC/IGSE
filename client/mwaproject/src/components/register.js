import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register(){
  const [usernameReg, setUsernameReg]= useState('');
  const [passwordReg, setPasswordReg]= useState('');
  const [property_type, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState(0);
  const [address, setAddress] = useState('');
  const [evc, setEVC] =useState(0)

let navigate = useNavigate()

  const register = ()=>{
    
    const payload = {
      customer_id: usernameReg,
      password_hash: passwordReg,
      bedrooms,
      property_type,
      address,
      evc
    }

    console.log(payload)


    axios.post('http://localhost:8000/register', payload).then(res => {
        
    navigate("/login")

       
    }).catch(e =>{ console.log(e)})


  };

  
  
  
  return (
    
    <div className="App">
      <div className="registration-box">
        <h1>Registration</h1>
        
        <label>Username</label>
        <input type="text" placeholder="Username"
        onChange={(e)=>{
          setUsernameReg(e.target.value);

        }}
        />
        
        <label>Password</label>
        <input type="text" placeholder="Password"
        onChange={(e)=>{
          setPasswordReg(e.target.value);
        }}/>

        <label>Address</label>
        <input type="text"
        onChange={(e)=>{
          setAddress(e.target.value);
        }}/>
        
        


       
        {/* <Dropdown onChange ={(e)=>{
          setPropertyType(e.target.value)
        }}/> */}
        <label>Property type</label>
        <input type="text"
        onChange={(e)=>{
          setPropertyType(e.target.value);
        }}/>
        
        
       
        

       <label>Bedrooms</label>
       <input type="text"
       onChange={(e)=>{
          setBedrooms(e.target.value);
       }}/>
    
      <label>EVC</label>
      
       <input tyep="text"
       placeholder="EVC CODE"
       
       pattern=".{0}|.{8,8}"
        
       maxLength={8}
       onChange={(e)=>{
          setEVC(e.target.value);
       }}/>
       
      <button className="button" onClick={register}> Register</button>
      
      <button className="button" onClick={()=>{
        navigate('/')
      }}> Login</button>
      </div>
    
      
    </div>
  );
}

export default Register