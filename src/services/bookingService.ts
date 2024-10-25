// src/services/bookingService.ts
interface Booking {
    vehicleId: string;
    userId: string;
    startDate: string;
    endDate: string;
    isInstant: boolean;
  }
  
  export const createBooking = async (booking: Booking) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  export const getBooking = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  };
  