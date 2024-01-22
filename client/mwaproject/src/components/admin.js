import React ,{useEffect, useState}from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./admin.css";




function Admin(){
    const [meterReadings, setMeterReadings]= useState([])
    const navigate =useNavigate();
    useEffect(() => {
        const token= localStorage.getItem("token")
        axios.get(`http://localhost:8000/admin/readings/all`, {headers:{
            "Authorization": `Bearer ${token}`
        }}).then(res=>{
            const { readings } = res.data;
            console.log(readings);
            setMeterReadings(readings)
            
        }).catch(e => navigate("/dashboard"))
        
     
    }, [])

    return (
        <div className="admin">
            <div>
                <h1>Admin Dashboard</h1>
            {meterReadings.map(reading => (
                   <ul>
                    <li>ReadingID {reading.reading_id}</li>
                    <li>CustomerID {reading.customer_id}</li>

                    <li>DayReading{reading.elec_readings_day}</li>
                    <li>NightReading {reading.elet_reading_night}</li>
                    <li>GasReading {reading.gas_reading}</li>
                    
                    <li>Status {reading.status}</li>
                   </ul>
                
                
                ))}
                </div>
            
            
        </div>
    )
}
export default Admin;