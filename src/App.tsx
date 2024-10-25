import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import VehicleListing from './pages/VehicleListing';
import Register from './auth/Register';
import Login from './auth/Login';
import VehicleDetails from './pages/VehicleDetails';
import Payment from './pages/Payment';
import ContactUs from './pages/ContactUs';
import UserProfile from './pages/UserProfile';
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col, flex flex-col h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<VehicleListing />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/vehicles/:id" element={<VehicleDetails />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/profile" element={<UserProfile/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
