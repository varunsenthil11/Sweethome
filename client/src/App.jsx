
import './App.css'
import React from 'react';
import Layout from './helpers/Layout';
import Indexpage from './pages/Indexpage';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import {Usercontextprovider} from './Usercontext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import axios from 'axios';
import Accountpage from './pages/Accountpage';


 axios.defaults.withCredentials = true;
function App() {

  return (
     <div>
      <Usercontextprovider>
<Router>
  <Layout/>
  <Routes>
  <Route path="/index"  element={<Indexpage />} />
  <Route path="/login"  element={<Loginpage />} />
  <Route path="/Register"  element={<Registerpage />} />
  <Route path="/Accounts/:subpage?"  element={<Accountpage />} />
  <Route path="/Accounts/:subpage?/:action"  element={<Accountpage />} />
  </Routes>
  </Router>
  </Usercontextprovider>
        </div>
  )
}

export default App
