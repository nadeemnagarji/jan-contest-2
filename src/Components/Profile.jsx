import React, { useEffect, useState } from 'react';
import './Profile.css'
export default function Profile({user}) {

    let [userData,setUserData]= useState(null)
    let[err,setErr] = useState(null)
 
let fetchData = async(id)=>{
    try {   
            let res = await fetch(`https://dummyjson.com/users/${id}`)
            let data = await res.json()
            console.log(data);
            
           setUserData(data)

    } catch (error) {
        console.log("Error",error);
        setErr("invalid username or password")
    }
}

    useEffect ( ()=>{
       fetchData(user.id)
    },[user.id])


    return(
    <div>
        {err? <p>{err}</p>
        :( userData ? (  <div className='main'>
    <h1>Profile Information</h1>
    <div className="profile-container">
    
    <div className="profile-details">
    <img src={userData.image} alt="" />
        <div>
        <strong>First Name:</strong> {userData.firstName}
        </div>
        <div>
        <strong>Last Name:</strong> {userData.lastName}
        </div>
        <div>
        <strong>Age:</strong> {userData.age}
        </div>
        <div>
        <strong>Date of Birth:</strong> {userData.birthDate}
        </div>
        <div>
        <strong>Address:</strong> {userData.address.address}
        </div>
        <div>
        <strong>City:</strong> {userData.address.city}
        </div>
    </div>
    
    </div>
    </div>)
    :<p>loading</p>)
    }

    </div>
 
   )
    
};
