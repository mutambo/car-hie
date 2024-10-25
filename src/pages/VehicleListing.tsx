import React from 'react';
import { Link } from 'react-router-dom';
import hyundai from '../assets/img/hyundai.jpg';
const VehicleListing: React.FC = () => {
  const vehicles = [
    { id: 1, name: 'Toyota Corolla', price: '$50/day', image: hyundai },
    { id: 2, name: 'Honda CR-V', price: '$80/day', image: hyundai },
    { id: 3, name: 'BMW X5', price: '$120/day', image: hyundai },
    { id: 4, name: 'BMW X5', price: '$120/day', image: hyundai },
    { id: 5, name: 'BMW X5', price: '$120/day', image: hyundai },
    { id: 6, name: 'BMW X5', price: '$120/day', image: hyundai },
    { id: 7, name: 'BMW X5', price: '$120/day', image: hyundai },
    { id: 8, name: 'BMW X5', price: '$120/day', image: hyundai },
    { id: 9, name: 'BMW X5', price: '$120/day', image: hyundai },
  ];

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-6">Choose Your Ride</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white shadow-lg rounded-lg p-4">
            <img src={vehicle.image} alt={vehicle.name} className="w-full h-40 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold">{vehicle.name}</h3>
            <p className="text-lg">{vehicle.price}</p>
            <Link to={`/vehicles/${vehicle.id}`} className="block mt-4 px-4 py-2 bg-blue-600 text-white rounded">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleListing;
