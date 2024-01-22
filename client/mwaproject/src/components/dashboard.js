import React ,{ useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function Dashboard(){
    const [usernameReg, setUsernameReg]= useState('');
    const [property_type,setPropertyType]= useState('');
    const [bedrooms, setBedrooms]= useState('');
    const [balance, setBalance]= useState('');
    const [meterReadings, setMeterReadings]=useState('');
    const [payBills, setBills]=useState('');
    const [topUp, setTopup]=useState('')

    const navigate =useNavigate();
    useEffect(() => {
        const token= localStorage.getItem("token")
        axios.get(`http://localhost:8000/customer`, {headers:{
            "Authorization": `Bearer ${token}`
        }}).then(res=>{
            const { property_type ,balance ,bedroom_num, customer_id } = res.data;
            setBalance(balance)
            setBedrooms(bedroom_num)
            setPropertyType(property_type)
            setUsernameReg(customer_id)

            console.log(res.data)
           
        }).catch(e => navigate("/login"))
        
     
    }, [])

    return(
        <div className="dashboard">
            <div>User Dashboard</div> 
            <label>Username</label>
            <div>{usernameReg}</div> 
            
            <label>Property Type</label>
            <div>{property_type}</div>

            <label>Bedrooms</label>
            <div>{bedrooms}</div>

            <label>Credit</label>
            <div> £{balance}</div>

            
        <input type="button" value="Submit New Meter Readings" onClick={(e)=>{
            navigate("/readings/new");
        }}/>

        <input type="button" value="View/Pay Bills" onClick={(e)=>{
             setBills(e.target.value);
        }}/>

        <input type="button" value="Account TopUp" onClick={(e)=>{
             navigate("/topup");
        }}/>

        <input type="button" value="Go Back" onClick={()=>{
            navigate(-1)
        }} />
        

        </div>
        
        
    )
}
export default Dashboard