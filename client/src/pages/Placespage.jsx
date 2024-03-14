import React,{useEffect, useState} from 'react'
import axios from 'axios';
import Photosuploader from './Photosuploader';
import '../helpers/styles/Placespage.css'
import { useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';

export default function Placespage() {
  const [places,setplaces] = useState([]);
  const {action} =useParams();
  const navigate = useNavigate();
    const[title,settitle]=useState('');
    const[address,setaddress]=useState('');
    const[addphotos,setaddedphotos]=useState([]);
    const[description,setdescription]=useState('');
    const[perks,setperks]=useState([]);
    const[extrainfo,setextrainfo]=useState('');
    const[checkin,setcheckin]=useState('');
    const[checkout,setcheckout]=useState('');
    const[maxguests,setmaxguests]=useState(1);
    const[redirect,setredirect] = useState(false);
      
useEffect(()=>{
axios.get('http://localhost:4000/places').then((res)=>{
  setplaces(data)
});
})


    function handlecbclick(ev){
const {checked,name} = ev.target;
if(checked){
setperks([...perks,name]);
}
else{
  setperks(
    perks.filter(selectedname => selectedname !== name)
);
}
  }

async function submit(){
await axios.post('http://localhost:4000/places',{title,address,addphotos,description,perks,extrainfo,checkin,checkout,maxguests})
setredirect(true);
}
useEffect(() => {
  if (redirect) {
      navigate('/Accounts/places');
      setredirect(false);
  }
}, [redirect, navigate]);

  return (
    <div>
    <button className='Addnew' onClick={()=>{
   navigate('/Accounts/places/new')
    }}>Add new</button>

{action==='new'&&(

  <div className='new'>
    <h2>Title</h2>
    <input type='text'className='textbox' onChange={(ev)=>settitle(ev.target.value)}></input>
    <h2>Address</h2>
    <input type='text'className='textbox' onChange={(ev)=>setaddress(ev.target.value)}></input>

    <Photosuploader   addphotos={addphotos} onChange={setaddedphotos} / >
    <div>
      <h2>Description</h2>
      <textarea className='Textarea'  onChange={(ev)=>setdescription(ev.target.value)}></textarea>
    </div>
    <br />
    <span>
    <label htmlFor="wifi">
      <input type="checkbox" name='wifi' id="wifi" onChange={handlecbclick}/> Wifi
    </label>
    <label htmlFor="parking"className='checkspace'>
      <input type="checkbox" id="parking" name='Free Parking Slot ' onChange={handlecbclick} /> Free Parking Slot
    </label>
    <label htmlFor="tv" className='checkspace'>
      <input type="checkbox" id="tv" name='tv' onChange={handlecbclick} /> Tv
    </label>
  </span>
  <br />
  <br />
  <span>
    <label htmlFor="private">
      <input type="checkbox" id="private" name='Radio' onChange={handlecbclick} /> Radio
    </label>
      <span className='pets'>
    <label  htmlFor="entrance">
      <input type="checkbox" id="entrance" name='Pets' onChange={handlecbclick} /> Pets
    </label>
    <label className='inputs' htmlFor="entrance">
      <input type="checkbox" id="entrance" name='inputs' onChange={handlecbclick} /> inputs
    </label>
    </span>
  </span>
  <div>
    <h2>Extra Info</h2>
    <textarea className='Textarea' onChange={(ev)=>{setextrainfo(ev.target.value)}}></textarea>
  </div>
  <div>
    <h2>
      Check In and Out Times
    </h2>
    <span>
      <span>Check in</span> 
      <span className='checknames'>Check out</span>
      <span className='checknames'>Max no of guests</span>
      <br></br>
      <span>
    <input type="text" className='checkin' placeholder='14:00' onChange={(ev)=>{setcheckin(ev.target.value)}}></input>
    <input type="text" className='checkin checknames1' placeholder='14:00' onChange={(ev)=>{setcheckout(ev.target.value)}}></input>
    <input type="text" className='checkin checknames1' placeholder='14:00' onChange={(ev)=>{setmaxguests(ev.target.value)}}></input>
    </span>
    </span>
  </div>
  <br></br>
  <button className='save' onClick={submit}>save</button>
  </div>
)}
{action!=='new'&&(
<div>
  {places.length>0&&places.map(place=>(
  <div></div>
  )
  )
  }
</div>

)}
    </div>
  )
}
