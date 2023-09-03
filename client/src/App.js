import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";


import Home from "./pages/Home";
import ShowRooms from "./pages/ShowRooms";
import  Navbar  from "./components/Navbar";
import  Signup  from "./pages/Signup";
import  Login  from "./pages/Login";
import Profile from "./pages/Profile";
import Booking from "./pages/Booking";

import Flights from "./pages/Flights"
import AdminPanel from "./pages/AdminPanel";
import UpdateRoom from "./pages/UpdateRoom";
import LandingPage from "./pages/LandingPage";
import About from "./components/LandingPage/About";
import Hero from "./components/LandingPage/Hero";

function App() {
  // Get the current location using the useLocation hook
  const location = useLocation();

  // Conditionally render the Navbar based on the current route
  const showNavbar = !["/login", "/signup"].includes(location.pathname);

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/edit/:id" element={<UpdateRoom />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/hotel/rooms/:id" element={<ShowRooms />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/book/:hotelid/:roomid/:fromdate/:todate"
          element={<Booking/>}
        />
         <Route path='/flight' element={<Flights/>}/>
         <Route  path='/admin' element={<AdminPanel/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
    
      </Routes>
    </div>
  );
}

export default App;
