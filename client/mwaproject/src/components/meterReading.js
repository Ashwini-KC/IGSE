import React,{useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./meterReading.css"

function Readings(){
    const [date, setDate]=useState(0);
    const [day, setDay]=useState('');
    const [night, setNight]=useState('');
    const [gas, setGas]=useState(0)

    let navigate=useNavigate()
    useEffect(()=> {
        let token=localStorage.getItem("token")
        axios.get('http://localhost:8000/customer/',{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res).catch(e => navigate("/login"))

    }, [])


        const readings=()=>{
            const payload={
                date,
                day,
                night,
                gas
            }
            console.log(payload)

            let token= localStorage.getItem("token")
            axios.post('http://localhost:8000/customer/readings/new',payload, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }).then(res=>{
                console.log(res.data);
                navigate("/dashboard")
            }).catch(e=>{console.log(e)})
        }

        return(
            <div className="readings">
                <div className="readingsContainer">
                    <h1>Readings</h1>
                    <label>Select date</label>
                    <input type="date" onChange={(e)=>{
                        setDate(e.target.value);
                    }}/>

                    <label>Meter Reading:Day</label>
                    <input type="text"
                    onChange={(e)=>{
                        setDay(e.target.value);
                    }}/>

                    <label>Meter Reading:Night</label>
                    <input type="text"
                    onChange={(e)=>{
                        setNight(e.target.value);
                    }}/>  

                    <label>Gas Reading</label>
                    <input type="text"
                    onChange={(e)=>{
                        setGas(e.target.value);
                    }}/>  

                    <button className="button" onClick={readings}>Submit</button>
                    <input type="button" value="Go Back" onClick={()=>{
                        navigate(-1)
                     }} />  

                </div>
            </div>
);
}


export default Readings;