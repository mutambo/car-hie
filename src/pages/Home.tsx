import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Import images directly
import hyundai from '../assets/img/hyundai.jpg';
import carousel2 from '../assets/img/hyundai.jpg';
import carousel3 from '../assets/img/hyundai.jpg';

const Home: React.FC = () => {
  // Use imported images in the array
  const images = [hyundai, carousel2, carousel3];

  return (
    <div className="flex items-center justify-center h-[60vh] relative"> {/* Set height to 60vh */}
      {/* Carousel Background */}
      <Carousel
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={5000}
        transitionTime={600}
        className="absolute inset-0 w-full h-full"
      >
        {images.map((img, index) => (
          <div key={index} className="w-full h-full">
            <img src={img} alt={`Slide ${index + 1}`} className="object-cover h-[72.5vh] w-full" /> {/* Fix height */}
          </div>
        ))}
      </Carousel>

      {/* Overlay Content */}
      <div className="relative z-10 bg-black bg-opacity-50 text-white text-center p-8 max-w-md mx-auto rounded-md">
        <h2 className="text-3xl font-bold mb-4">Welcome to Your Trusted Car Hire Service</h2>
        <p className="text-lg mb-6">Affordable car rentals for every journey</p>
        <Link to="/vehicles" className="px-6 py-2 bg-blue-600 text-white rounded-full">
          Explore Vehicles
        </Link>
      </div>
    </div>
  );
};

export default Home;