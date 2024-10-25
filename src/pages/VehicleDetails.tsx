import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleBooking = () => {
    if (!startDate || !endDate) {
      alert('Please select a booking period');
      return;
    }
    // Handle booking logic here
    console.log('Booking from:', startDate, 'to:', endDate);
  };
  // Simulating data fetching from backend or API
  const vehicleData: Vehicle[] = [
    {
      id: 1,
      name: 'Toyota Corolla',
      price: '$50/day',
      description: 'A reliable and fuel-efficient sedan, perfect for city driving.',
      image: hyundaiImg,
      features: ['Automatic Transmission', 'Air Conditioning', 'Fuel Efficiency'],
    },
    {
      id: 2,
      name: 'Honda CR-V',
      price: '$80/day',
      description: 'A spacious and comfortable SUV, ideal for family trips and long journeys.',
      image: hyundaiImg,
      features: ['All-Wheel Drive', 'Spacious Interior', 'Advanced Safety Features'],
    },
    {
      id: 3,
      name: 'BMW X5',
      price: '$120/day',
      description: 'A luxury SUV offering the best in performance, comfort, and style.',
      image: hyundaiImg,
      features: ['Luxury Interior', 'All-Wheel Drive', 'Premium Sound System'],
    },
    {
        id: 4,
        name: 'BMW X5',
        price: '$120/day',
        description: 'A luxury SUV offering the best in performance, comfort, and style.',
        image: hyundaiImg,
        features: ['Luxury Interior', 'All-Wheel Drive', 'Premium Sound System'],
      },
      {
        id: 5,
        name: 'BMW X5',
        price: '$120/day',
        description: 'A luxury SUV offering the best in performance, comfort, and style.',
        image: hyundaiImg,
        features: ['Luxury Interior', 'All-Wheel Drive', 'Premium Sound System'],
      },
      {
        id: 6,
        name: 'BMW X5',
        price: '$120/day',
        description: 'A luxury SUV offering the best in performance, comfort, and style.',
        image: hyundaiImg,
        features: ['Luxury Interior', 'All-Wheel Drive', 'Premium Sound System'],
      },
      {
        id: 7,
        name: 'BMW X5',
        price: '$120/day',
        description: 'A luxury SUV offering the best in performance, comfort, and style.',
        image: hyundaiImg,
        features: ['Luxury Interior', 'All-Wheel Drive', 'Premium Sound System'],
      },
      {
        id: 8,
        name: 'BMW X5',
        price: '$120/day',
        description: 'A luxury SUV offering the best in performance, comfort, and style.',
        image: hyundaiImg,
        features: ['Luxury Interior', 'All-Wheel Drive', 'Premium Sound System'],
      },
      {
        id: 9,
        name: 'BMW X5',
        price: '$120/day',
        description: 'A luxury SUV offering the best in performance, comfort, and style.',
        image: hyundaiImg,
        features: ['Luxury Interior', 'All-Wheel Drive', 'Premium Sound System'],
      },
  ];

  const vehicle = vehicleData.find((v) => v.id === parseInt(id|| '0'));

  if (!vehicle) {
    return <div className="container mx-auto py-12"><h2 className="text-3xl text-center">Vehicle not found</h2></div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={vehicle.image} alt={vehicle.name} className="w-full h-64 object-cover rounded-lg shadow-md" />
        
        <div>
          <h2 className="text-4xl font-bold mb-4">{vehicle.name}</h2>
          <p className="text-2xl text-blue-600 font-semibold mb-4">{vehicle.price}</p>
          <p className="text-lg mb-6">{vehicle.description}</p>

          <h3 className="text-xl font-semibold mb-2">Features</h3>
          <ul className="list-disc list-inside mb-6">
            {vehicle.features.map((feature, index) => (
              <li key={index} className="text-gray-700">{feature}</li>
            ))}
          </ul>

          <Link to="/payment" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Book Now
          </Link>
        </div>
      </div>
      <Calendar startDate={startDate} endDate={endDate} onChange={handleDateChange} />
      <button
        onClick={handleBooking}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default VehicleDetails;
