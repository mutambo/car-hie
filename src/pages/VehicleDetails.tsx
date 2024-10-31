import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from '../components/Calendar';
import hyundaiImg from '../assets/img/hyundai.jpg';

interface Vehicle {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  features: string[];
}

const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [drivingLicenseFront, setDrivingLicenseFront] = useState<File | null>(null);
  const [drivingLicenseBack, setDrivingLicenseBack] = useState<File | null>(null);
  const [idCardFront, setIdCardFront] = useState<File | null>(null);
  const [idCardBack, setIdCardBack] = useState<File | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleBooking = () => {
    if (!startDate || !endDate || !pickupTime || !pickupLocation || !destination || !drivingLicenseFront || !drivingLicenseBack || !idCardFront || !idCardBack) {
      alert('Please complete all fields, including document uploads.');
      return;
    }

    navigate(`/payment`);
  };

  const vehicle = {
    id: 1,
    name: 'Toyota Corolla',
    price: '$50/day',
    description: 'A reliable and fuel-efficient sedan, perfect for city driving.',
    image: hyundaiImg,
    features: ['Automatic Transmission', 'Air Conditioning', 'Fuel Efficiency'],
  };

  return (
    <div className="container mx-auto py-12 px-6 max-w-4xl">
      {/* Vehicle Information Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-lg"
        />
        <div className="flex-1 bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">{vehicle.name}</h2>
          <p className="text-2xl text-blue-600 font-semibold mb-4">{vehicle.price}</p>
          <p className="text-lg text-gray-700 mb-6">{vehicle.description}</p>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Features</h3>
          <ul className="list-disc list-inside text-gray-700">
            {vehicle.features.map((feature, index) => (
              <li key={index} className="text-lg font-medium">{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="bg-gray-50 rounded-lg shadow-md p-8 mb-10">
        <Calendar startDate={startDate} endDate={endDate} onChange={handleDateChange} />

        <div className="flex flex-col sm:flex-row gap-6 mt-6">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">Pick-up Time</label>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">Pick-up Location</label>
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-6">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Document Upload Section */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Upload Required Documents</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Driving License (Front)</label>
              <input
                type="file"
                onChange={(e) => setDrivingLicenseFront(e.target.files ? e.target.files[0] : null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Driving License (Back)</label>
              <input
                type="file"
                onChange={(e) => setDrivingLicenseBack(e.target.files ? e.target.files[0] : null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">National ID (Front)</label>
              <input
                type="file"
                onChange={(e) => setIdCardFront(e.target.files ? e.target.files[0] : null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">National ID (Back)</label>
              <input
                type="file"
                onChange={(e) => setIdCardBack(e.target.files ? e.target.files[0] : null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Confirm Booking Button */}
        <button
          onClick={handleBooking}
          className="mt-8 w-full px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default VehicleDetails;
