import axios from 'axios';

// Define booking types
export type BookingType = 'ROOM' | 'APPOINTMENT';

// Base booking interface
export interface Booking {
  serviceType: BookingType;
  location: string;
  startTime: string;
  endTime: string;
  date: string;
}

// Room booking interface
export interface RoomBooking extends Booking {
  serviceType: 'ROOM';
}

// Appointment booking interface
export interface AppointmentBooking extends Booking {
  serviceType: 'APPOINTMENT';
  lecturerName: string;
}

// Response type
interface BookingResponse {
  message: string;
}

// Mock room locations for demo
export const roomLocations = [
  'Computer Lab 202',
  'Library Study Room 101',
  'Conference Room A',
  'Lecture Hall 305',
  'Media Lab',
  'Science Lab 405',
  'Engineering Workshop',
  'Design Studio'
];

// Mock lecturer names for demo
export const lecturerNames = [
  'Dr. Johnson',
  'Prof. Smith',
  'Dr. Williams',
  'Prof. Davis',
  'Dr. Martinez',
  'Prof. Taylor',
  'Dr. Brown',
  'Prof. Miller'
];

// API base URL - replace with your actual API URL
const API_URL = 'http://localhost:8080/api/v1';

// Create a new booking
const createBooking = async (booking: RoomBooking | AppointmentBooking): Promise<BookingResponse> => {
  try {
    // In a real app, this would call the actual API
    // For now, we'll mock the response for development
    
    // Uncomment this when API is ready
    // const response = await axios.post(`${API_URL}/student/bookings`, booking);
    // return response.data;
    
    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Booking created:', booking);
        resolve({ message: 'Booking saved' });
      }, 1000);
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Get all bookings for the current student
const getMyBookings = async (): Promise<(RoomBooking | AppointmentBooking)[]> => {
  try {
    // In a real app, this would call the actual API
    // For now, we'll mock the response for development
    
    // Uncomment this when API is ready
    // const response = await axios.get(`${API_URL}/student/bookings`);
    // return response.data;
    
    // Mock response with some sample bookings
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            serviceType: 'ROOM',
            location: 'Computer Lab 202',
            startTime: '09:00:00',
            endTime: '11:00:00',
            date: '2023-10-20'
          },
          {
            serviceType: 'APPOINTMENT',
            location: 'Science Building, Office 105',
            lecturerName: 'Dr. Johnson',
            startTime: '14:30:00',
            endTime: '15:00:00',
            date: '2023-10-21'
          }
        ]);
      }, 1000);
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Cancel a booking
const cancelBooking = async (bookingId: string): Promise<BookingResponse> => {
  try {
    // In a real app, this would call the actual API
    // For now, we'll mock the response for development
    
    // Uncomment this when API is ready
    // const response = await axios.delete(`${API_URL}/student/bookings/${bookingId}`);
    // return response.data;
    
    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Booking cancelled:', bookingId);
        resolve({ message: 'Booking cancelled successfully' });
      }, 1000);
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
};

const bookingService = {
  createBooking,
  getMyBookings,
  cancelBooking,
  roomLocations,
  lecturerNames
};

export default bookingService; 