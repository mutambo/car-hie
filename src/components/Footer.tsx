import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-1"> {/* Further reduced padding */}
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center"> {/* Centered content */}
        <div className="mb-1 md:mb-0 md:w-1/3 text-center"> {/* Reduced margin */}
          <h4 className="font-bold text-sm">Car Hire</h4> {/* Further reduced font size */}
          <p className="mt-1 text-xs"> {/* Further reduced font size */}
            Your trusted partner for car rentals,<br />
            offering flexibility and affordability for every journey.
          </p>
        </div>
        <div className="mb-1 md:mb-0 md:w-1/3 text-center"> {/* Reduced margin */}
          <h4 className="font-bold text-sm">Follow Us</h4> {/* Further reduced font size */}
          <div className="flex justify-center space-x-1 mt-1"> {/* Reduced space between icons */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="mb-1 md:mb-0 md:w-1/3 text-center"> {/* Reduced margin */}
          <h4 className="font-bold text-sm">Contact Us</h4> {/* Further reduced font size */}
          <p className="mt-1 text-xs">Email: support@carhire.com</p> {/* Further reduced font size */}
          <p className="text-xs">Phone: (123) 456-7890</p> {/* Further reduced font size */}
        </div>
      </div>
      <div className="text-center mt-1"> {/* Further reduced margin */}
        <p className="text-xs"> {/* Font size remains small */}
          &copy; {new Date().getFullYear()} Car Hire. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;