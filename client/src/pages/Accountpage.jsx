import React from 'react'
import { useContext,useState} from 'react';
import axios from 'axios';
import '../helpers/styles/Accountpage.css'
import Placespage from './Placespage';
import { Usercontext } from "../Usercontext";
import { useNavigate } from "react-router-dom";
import {Navigate,Link,useParams} from 'react-router-dom';
export default function Accountpage() {
  const[redirect,setredirect] = useState(null);
  const {user,setuser,ready}  = useContext(Usercontext)
    const {subpage} = useParams();
  function logout(){
  axios.post('http://localhost:4000/logout')
    setuser(null);
    setredirect('/');
  }
    const navigate = useNavigate();
    
    if(!ready){
     return 'Loading...';
    }
    if(!user&&ready){
        return <Navigate to={'/login'}></Navigate>
    }
    if(redirect){
      navigate('/');
    }
    console.log(subpage)
  return (
    <div>
    <div className='top'>
        <span><button className='button'onClick={()=>{navigate("/Accounts/profile")}}>My profile</button></span>  
        <span><button className='left button' onClick={()=>{navigate("/Accounts/bookings")}}>My bookings</button></span>  
        <span><button className='left button' onClick={()=>{navigate("/Accounts/places")}}>My accomodations</button></span>  
     </div>
     <div>
     {subpage === 'profile'&&(
        <p className='profile'> Logged in as {user.name} with email {user.email}
        <br></br>
        <button className='Logout'onClick={logout}>Logout</button>
        </p>
        
   )}

    {subpage==='places'&&(

      <Placespage/>
    )}



     </div>
    </div>
   
  )
}
