// src/pages/UserProfile.tsx
import React, { useEffect, useState } from 'react';
import {
  getUserProfile,
  updateUserProfile,
  getUserBookingHistory,
} from '../services/userService';
import type { UserProfile, Booking } from '../services/userService';
import { registerUser, signInUser } from '../services/authService';

const UserProfileComponent: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [bookingHistory, setBookingHistory] = useState<Booking[] | null>(null);
  
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const [signInEmail, setSignInEmail] = useState<string>('');
  const [signInPassword, setSignInPassword] = useState<string>('');

  const userId = 'currentUserUID'; // Replace this with actual user ID from auth context

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile(userId);
      if (profile) {
        setUserProfile(profile);
        setName(profile.name);
        setEmail(profile.email);
        setPhoneNumber(profile.phoneNumber || '');
      }
    };

    const fetchUserBookingHistory = async () => {
      const bookings = await getUserBookingHistory(userId);
      if (bookings) {
        setBookingHistory(bookings);
      }
    };

    fetchUserProfile();
    fetchUserBookingHistory();
  }, [userId]);

  const handleProfileUpdate = async () => {
    if (userProfile) {
      const updatedProfile = {
        name,
        email,
        phoneNumber,
      };

      await updateUserProfile(userProfile.id, updatedProfile);
      setUserProfile({ ...userProfile, ...updatedProfile });
      setEditMode(false);
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser(registerEmail, registerPassword);
      alert('Registration successful. You can now sign in.');
      setRegisterEmail('');
      setRegisterPassword('');
    } catch (error) {
      // Type assertion to handle the error safely
      const errorMessage = (error as Error).message || 'Registration failed';
      alert('Registration failed: ' + errorMessage);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInUser(signInEmail, signInPassword);
      alert('Sign-in successful. Welcome!');
      setSignInEmail('');
      setSignInPassword('');
      // You might want to fetch user profile and booking history again after sign-in
    } catch (error) {
      // Type assertion to handle the error safely
      const errorMessage = (error as Error).message || 'Sign-in failed';
      alert('Sign-in failed: ' + errorMessage);
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        {editMode ? (
          <input
            type="text"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p>{userProfile.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        {editMode ? (
          <input
            type="email"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <p>{userProfile.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        {editMode ? (
          <input
            type="text"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        ) : (
          <p>{userProfile.phoneNumber || 'Not provided'}</p>
        )}
      </div>

      {editMode ? (
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleProfileUpdate}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setEditMode(true)}
        >
          Edit Profile
        </button>
      )}

      <h2 className="text-xl font-bold mt-6 mb-4">Booking History</h2>
      {bookingHistory && bookingHistory.length > 0 ? (
        <div>
          {bookingHistory.map((booking) => (
            <div key={booking.bookingId} className="mb-4 p-4 border border-gray-300 rounded">
              <p>
                <strong>Vehicle ID:</strong> {booking.vehicleId}
              </p>
              <p>
                <strong>From:</strong> {new Date(booking.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>To:</strong> {new Date(booking.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Cost:</strong> ${booking.totalCost.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings found.</p>
      )}

      {/* Registration Form */}
      <h2 className="text-xl font-bold mt-6 mb-4">Register</h2>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          className="mt-2 p-2 border border-gray-300 rounded w-full"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mt-2 p-2 border border-gray-300 rounded w-full"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>

      {/* Sign-in Form */}
      <h2 className="text-xl font-bold mt-6 mb-4">Sign In</h2>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          className="mt-2 p-2 border border-gray-300 rounded w-full"
          value={signInEmail}
          onChange={(e) => setSignInEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mt-2 p-2 border border-gray-300 rounded w-full"
          value={signInPassword}
          onChange={(e) => setSignInPassword(e.target.value)}
        />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default UserProfileComponent;
