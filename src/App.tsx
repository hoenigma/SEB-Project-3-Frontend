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
import axios from "axios";
import React from "react";


function App() {
      //set a useState for the user, so we can put in a prop to the Navbar
  const[user, setUser] = useState(null)
//fetch the user info and the token for that user
  async function fetchUser(){

    const token = localStorage.getItem("token")
    //the response is the getCurrentUser function and the token from the website
    const resp = await axios.get('/api/user', {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log(resp.data)
    //the user has been set to the resp.data which is the user details (username, email, id)
    setUser(resp.data)
    
  }
  //using useEffect to run this once when laoded in
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
        {/* <Route path="/addanimal" element={< AddAnimal />} /> */}
        <Route path="/animal/:animalId" element={<ShowAnimal  />} /> */
      </Routes>
    </Router>
  );
}

export default App;
