import React,{useState} from "react";
import '../helpers/styles/Loginpage.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
export default  function Loginpage(){
  const [name,setname] = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  async function fn(e){
  e.preventDefault();
  console.log(name+" "+email+" "+password);
  try {
    await axios.post('http://localhost:4000/Register', { name, email, password })
    console.log("success");
    alert('Registered successfully');
  } catch (e) {
    console.log("failed");
    alert('failed');
  }
}
    return(<div >
      <form className="form" onSubmit={fn}> 
      <div className="fir">
       <input className="text" type="text" name="name" placeholder="Enter Name" 
       onChange={ev=>{
        setname(ev.target.value)
       }}
       value={name} />
      </div>

       <div className="fir"> <input className="text" type="text" name="email" placeholder="your@gmail.com"
         onChange={ev=>{
          setemail(ev.target.value)
         }}
         value={email} />
       </div>
       <div className="sec" > <input className="text"type="password" name="password" placeholder="Password"
        onChange={ev=>{
          setpassword(ev.target.value)
         }}
         value={password}  />
       </div>
       <div className="thir"> <button className="but">Register</button> </div>
       <div>Already have an account <Link to="/login">login</Link> </div>
      </form>
    </div>)
}