import React,{ useState }   from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
function Login({updateUser}) {
    const [usernameReg, setUsernameReg]= useState('');
    const [passwordReg, setPasswordReg]= useState('')
    let navigate = useNavigate();
    const login = ()=>{

    const payload = {
        customer_id: usernameReg,
        password_hash: passwordReg
    }

    console.log(payload)


    axios.post('http://localhost:8000/login', payload).then(res => { 
        alert(res.data.msg)
        
        console.log(res.data)
        navigate('/admin')
        localStorage.setItem("token", res.data.token)
    }).catch(e => console.log(e.response))
  };

  return(
    
    <div className ="login">
        <div className="loginContainer">
        <h1>Login</h1>
        <input type="text" placeholder="Username.." onChange={(e)=>{setUsernameReg(e.target.value)}}/>
        <input type="password" placeholder="Password.." onChange={(e)=>{setPasswordReg(e.target.value)}}/>
        <button className="button" onClick={login}>Login</button>
        <button onClick={()=>{
            navigate('/register')
        }} className="button">Register</button>
        </div>
      </div>
      
      );
    }
    
    export default Login;