// src/services/userService.ts
export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
  }
  
  export interface Booking {
    bookingId: string;
    vehicleId: string;
    startDate: string;
    endDate: string;
    totalCost: number;
  }
  
  // Mock data for the demo purposes
  const mockUserProfile: UserProfile = {
    id: 'user123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
  };
  
  const mockUserBookings: Booking[] = [
    {
      bookingId: 'booking1',
      vehicleId: 'carA123',
      startDate: '2024-10-01',
      endDate: '2024-10-05',
      totalCost: 250.0,
    },
    {
      bookingId: 'booking2',
      vehicleId: 'carB456',
      startDate: '2024-09-15',
      endDate: '2024-09-20',
      totalCost: 320.0,
    },
  ];
  
  // Fetch user profile from API (or mocked data here)
  export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      // Simulate API call with mock data
      if (userId === mockUserProfile.id) {
        return mockUserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };
  
  // Update user profile with new data
  export const updateUserProfile = async (
    userId: string,
    updatedProfile: Partial<UserProfile>
  ): Promise<boolean> => {
    try {
      // Simulate API call to update user profile
      if (userId === mockUserProfile.id) {
        // Merge existing profile with updated data
        Object.assign(mockUserProfile, updatedProfile);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  };
  
  // Fetch user booking history from API (or mocked data here)
  export const getUserBookingHistory = async (userId: string): Promise<Booking[] | null> => {
    try {
      // Simulate API call with mock data
      if (userId === mockUserProfile.id) {
        return mockUserBookings;
      }
      return null;
    } catch (error) {
      console.error('Error fetching booking history:', error);
      return null;
    }
  };
  