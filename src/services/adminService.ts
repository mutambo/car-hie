// src/services/adminService.ts
export const getAdminDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const manageBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings');
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  