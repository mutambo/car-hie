// src/components/ProfileMenu.tsx
import React, { useState } from 'react';
import { signOutUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Profile
      </button>
      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 bg-white border rounded shadow-lg">
          <ul className="py-2">
            <li>
              <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => navigate('/profile')}
              >
                View Profile
              </button>
            </li>
            <li>
              <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => navigate('/booking-history')}
              >
                Booking History
              </button>
            </li>
            <li>
              <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
