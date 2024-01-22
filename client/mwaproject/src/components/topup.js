import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./topup.css";


function Topup(){
    const [voucher , setEVC]= useState(0)

let navigate=useNavigate()

    const topup=()=>{
        const payload={
            code:voucher
        }

console.log(payload)

const token= localStorage.getItem("token")
axios.post('http://localhost:8000/customer/topup',payload, {
    headers: {
        "Authorization": `Bearer ${token}`
    }
}).then(res=>{
    console.log(res.data)
}).catch(e=>{console.log(e)})
    };


return(
    <div className="topup">
        <div className="topupContainer">
        <h1>Topup</h1>
        <label> Voucher</label>
        <input type="text" placeholder="Enter voucher code"
        onChange={(e)=>{
            setEVC(e.target.value);
        }}/>

        <button className="button" onClick={topup}>Topup</button>
        <input type="button" value="Go Back" onClick={()=>{
            navigate(-1)
        }} />
        </div>
    </div>

);
}

export default Topup;
