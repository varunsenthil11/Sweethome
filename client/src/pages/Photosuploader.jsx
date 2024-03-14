import React from 'react'
import axios from 'axios';
import { useState } from 'react';
export default function Photosuploader({addphotos,onChange}) {
    const[photolink,setphotolink]=useState('');
    async function uploadphoto(ev){
        const files = ev.target.files
        const data = new FormData();
        for(let i=0;i<files.length;i++){
        data.append('photos',files[i]);
        }
        axios.post('http://localhost:4000/upload',data,{headers:{'Content-Type':'multipart/form-data'}}).then(response=>{
         console.log(response);
        const{data:filename} =response;
       onChange((prev)=>{
      return[...prev,filename];
     })
        })
  
       console.log(ev.target.files);
      }
    async function addphotobylink(){
        const{data:filename} =await axios.post('http://localhost:4000/uploadbylink',{link:photolink});
        onChange((prev)=>{
         return[...prev,...filename];
        })
         }
  return (
    <div>
    <h2>Photos</h2>
    <span>
    <input type='text' className='link' onChange={(ev)=>{
      setphotolink(ev.target.value)
    }}></input>
    <button className='Addphoto' onClick={()=>{
      addphotobylink()
    }}>Add photo</button>
    </span>
    <div className='photo'>
    {addphotos.length>0 && (
    addphotos.map((link)=>{
      return(
      <span key={link}>
      <img className='image' src={'http://localhost:4000/uploads/'+link} alt=''></img></span>
      )
      })
    )}
    <label  className='upload'>Upload from your device
    <input  className= 'upload visible' type='file' id='hihi' onChange={uploadphoto} ></input>
    </label>
    </div>
    </div>
  )
}
