import React, {  useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './context/context';

export const Dashboard= ()=>{
    const his=useNavigate();
    
    const {logindata,setLoginData}=useContext(LoginContext);

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("http://localhost:8000/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();
        if (data.status === 401 || !data) {
           his("*");
        } else {
            console.log("user verify");
            setLoginData(data);
            his("/dash");
        }
    }

    useEffect(()=>{
        DashboardValid();
    },[]);

    return (
        <>
            <h1 style={{marginLeft:"650px",marginTop:"100px"}}>HI Welcome to Dashboard</h1>

        </>
    )
}