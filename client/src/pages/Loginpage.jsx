import React, {useState,useContext} from "react";
import '../helpers/styles/Loginpage.css'
import {Navigate,Link } from 'react-router-dom';
import axios from "axios";
import { Usercontext } from "../Usercontext";
export default  function Loginpage(){
  const {setuser}  = useContext(Usercontext)
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [redirect,setredirect] = useState(false);
  async function fn(e) {
    e.preventDefault();
  const doc = await axios.post('http://localhost:4000/login',{email,password});
   setuser(doc.data);
   alert('login success')
   setredirect(true)
  }
  if(redirect){
   return <Navigate to={'/'}></Navigate>
  }
    return(<div >
      <form className="form" onSubmit={fn}>
       <div className="fir"> <input className="text" type="email" name="email" placeholder="your@gmail.com" value={email} onChange={(e)=>{setemail(e.target.value)}} /></div>
       <div className="sec" > <input className="text"type="password" name="password" placeholder="Password" onChange={(e)=>{setpassword(e.target.value)}}/></div>
       <div className="thir"> <button className="but" type="submit">Login</button> </div>
       <div>Don't have an account <Link to="/Register">Register</Link> </div>
      </form>
    </div>)
}