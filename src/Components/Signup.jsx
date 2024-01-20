import React, { useState } from 'react';
import Profile from './Profile';

Profile

export default function Signup(params) {
 
    let [user,setUser ] = useState({username:"",password:""})
    let [err,setErr] = useState(null)
    let [validate,setValidate] = useState(null)
    let [data,setdata]= useState(null)

let callApi = (username,password)=>{
    fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username:username,
    password:password,
  })
})
.then((res)=> {
    if(!res.ok){
        setErr(`HTTP error! Enter valid Email or Password Status: ${res.status}`)
    }
   return  res.json()
})
.then(userinfo => setdata(userinfo))
}

    let handleUser = (e)=>{
       let key = e.target.name
       setUser({...user,[key]:e.target.value})
       console.log(user);
    }

    let handleSubmit = (e)=>{
        e.preventDefault()
            if(!user.username || !user.password){
                setValidate("Enter All fields")
            }else{
                setErr(null)
                localStorage.setItem("email",user.username)
                localStorage.setItem("password",user.password)
                callApi(user.username,user.password)
            }
    }

    return(

        <div  >
            { err? <h1 className='error'>{err}</h1>: data?<Profile user ={ data} />:
            <div className='container'> 
            <form  onSubmit={handleSubmit} >
            <div className='title'>
             <span className='welcome'>Welcome back</span>
               <p>Sign in to your account</p>
            </div>
            <div>
            <label htmlFor="username"> Your Email</label>
            <input id='username' type="text" onChange={handleUser}   name="username" value={user.username}/>
            {validate&& <p>{validate}</p>}
            </div>
            <div>
            <label htmlFor="password">Password</label>
            <input id='password' type="password" onChange={handleUser}  name="password"  value={user.password}/>
            {validate&& <p>{validate}</p>}
             </div>
         
            <div className='end-div'>
            <button type='submit'>CONTINUE</button>
            <p>Forgot your password?</p>
            </div>
        </form>
        <p className='dont'>Don’t have an account? <span>Sign up</span></p>
        </div>
            }
       
           
            
        
        </div>
 
    )
}
