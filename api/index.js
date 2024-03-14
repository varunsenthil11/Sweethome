const express = require('express');
const Place =require('./placemodel');
const bcrypt = require('bcryptjs');
const multer =  require('multer');
const fs = require('fs');
const imagedownloader = require('image-downloader');
const app = express();
app.use('/uploads',express.static(__dirname+'/uploads'))
const cors = require('cors');
const cookieparsor = require('cookie-parser');
app.use(cookieparsor());
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(6);
const jwtsecretkey="asjdsjsjdsdijsijdj2323111"
const mongoose = require('mongoose')
const users = require('./db');
mongoose.connect('mongodb://127.0.0.1:27017/airbnb').then(()=>{console.log("connected")}).catch((e)=>{
    console.log(e);
})
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.post('/Register',async (req,res)=>{
    console.log("received")
   const{name,email,password}=req.body
   console.log(name)
   try {
 const user = await users.create({
    name:name,
    email:email,
    password:bcrypt.hashSync(password,salt)})
   .then((res)=>console.log(res))
 }
 catch(e){
   res.status(202).json(e)
 }
}

)

app.post('/login',async(req,res)=>{
    const {email,password} = req.body;
  const doc =  await users.findOne({email:email})
   if(doc){
    const passok = bcrypt.compareSync(password,doc.password)
    if(passok){
        jwt.sign({email:doc.email,id:doc._id},jwtsecretkey,{},(err,token)=>{
            if(err) throw err; 
            else
            res.cookie('token',token, {httpOnly: false});
          res.send(doc)
        })
   }
}
else{
    res.status(222).json('pass not ok')
}
})

app.get('/profile',async (req,res)=>{
   const {token} = req.cookies;
   if(token){
    jwt.verify(token,jwtsecretkey,{},async(err,userdata)=>{
      if(err) throw err;
    const {name,email,_id} =  await users.findById(userdata.id)
    res.json({name,email,_id})
    })
  }
   else
   res.json(null);
})

app.post('/logout',(req,res)=>{
  console.log("hi");
  res.cookie('token','').json(true);
})


app.post('/uploadbylink', async (req, res) => {
  const { link } = req.body;
  const newname = Date.now() + '.jpg';

  await imagedownloader.image({ url: link, dest: __dirname + '/uploads/' + newname })
    .then(({ filename }) => {
      console.log('Saved to', filename); 
    })
    .catch((err) => console.error(err));

  res.json(newname);
});
const photosmiddleware = multer({dest:__dirname + '/uploads/'})
app.post('/upload',photosmiddleware.array('photos',100),async(req,res)=>{
  const uploadedfiles = [];
  for(let i=0;i<req.files.length;i++){
    const{path,originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext= parts[parts.length-1];
    const newpath = path+'.'+ext;
    fs.renameSync(path,newpath);
    console.log(newpath)
    uploadedfiles.push(newpath.substring(30));
  }
  console.log(uploadedfiles);
  res.json(...uploadedfiles);
})

app.post('/places',(req,res)=>{
  const{token} = req.cookies;
  const{title,address,addphotos,description,perks,extrainfo,checkin,checkout,maxguests}= req.body;

    jwt.verify(token,jwtsecretkey,{},async(err,userdata)=>{
      if(err) throw err;
     const placedoc = await Place.create({
      owner:userdata.id,
      title,address,addphotos,description,perks,extrainfo,checkin,checkout,maxguests
     })
     res.json(placedoc)
    })
   
})
 
app.get('/places',(req,res)=>{
  console.log("hihih");
  const{token} = req.cookies;
  jwt.verify(token,jwtsecretkey,{},async(err,userdata)=>{
    const {id} = userdata;
    res.json(await Place.find({owner:id}))
  })
})




app.listen(4000,()=>{
    console.log("server is running")
});
