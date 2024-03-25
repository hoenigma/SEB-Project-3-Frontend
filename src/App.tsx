import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from './components/Signin'
import Login from './components/Login'
// import AddAnimal from './components/AddAnimal'
import { useEffect, useState } from "react";
import ShowAnimal from "./components/ShowAnimal";
import AllAnimals from "./components/AllAnimals";
import AddAnimal from "./components/AddAnimal";
import axios from "axios";
import React from "react";


function App() {
  const[user, setUser] = useState(null)
  async function fetchUser(){

    const token = localStorage.getItem("token")
    const resp = await axios.get('/api/user', {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log(resp.data)
    setUser(resp.data)
    
  }
  //if there is a token (so if user logged in) it will fetch the user
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token) fetchUser()
  },[])

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animals" element={<AllAnimals />} />
        <Route path="/signup" element={< Signup />} />
        <Route path="/login" element={< Login fetchUser={fetchUser} />} /> 
        <Route path="/addanimal" element={< AddAnimal />} /> 
        <Route path="/animal/:animalId" element={<ShowAnimal  />} /> 
      </Routes>
    </Router>
  );
}

export default App;
