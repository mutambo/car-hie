import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 text-white relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">Car Hire</h1>

        {/* Hamburger Menu Icon */}
        <button
          className="md:hidden block text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>

        {/* Desktop Links (Only shown on larger screens) */}
        <div className="hidden md:flex md:flex-row items-center md:space-x-4">
          <Link className="mx-2" to="/">Home</Link>
          <Link className="mx-2" to="/vehicles">Vehicles</Link>
          <Link className="mx-2" to="/payment">Payment</Link>
          <Link className="mx-2" to="/contact-us">Contact Us</Link>
        </div>
      </div>

      {/* Toggle Menu (Displayed outside the navbar only on small devices) */}
      {isOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-gray-700 p-4 flex flex-col items-start">
          <Link className="my-2" to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link className="my-2" to="/vehicles" onClick={() => setIsOpen(false)}>Vehicles</Link>
          <Link className="my-2" to="/payment" onClick={() => setIsOpen(false)}>Payment</Link>
          <Link className="my-2" to="/contact-us" onClick={() => setIsOpen(false)}>Contact Us</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
