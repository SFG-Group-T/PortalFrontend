import axios from 'axios';

// Types
export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdBy: {
    id: string;
    username: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MaintenanceResponse {
  message: string;
}

// API base URL - replace with your actual API URL
const API_URL = 'http://localhost:8080/api/v1';

// Mock data for development
const MOCK_MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
  {
    id: '1',
    title: 'Broken Projector',
    description: 'Projector in Room 101 is not displaying images correctly.',
    location: 'Room 101, Engineering Building',
    category: 'Equipment',
    status: 'pending',
    priority: 'high',
    createdBy: {
      id: '1',
      username: 'lecturer',
      role: 'lecturer'
    },
    createdAt: '2023-05-15T09:30:00Z',
    updatedAt: '2023-05-15T09:30:00Z'
  },
  {
    id: '2',
    title: 'Air Conditioning Issue',
    description: 'The air conditioning in the Computer Lab is not working.',
    location: 'Computer Lab, Science Building',
    category: 'HVAC',
    status: 'in-progress',
    priority: 'medium',
    createdBy: {
      id: '2',
      username: 'student',
      role: 'student'
    },
    createdAt: '2023-05-14T14:45:00Z',
    updatedAt: '2023-05-15T08:15:00Z'
  },
  {
    id: '3',
    title: 'Leaking Roof',
    description: 'Water leaking from the ceiling in the library reading area.',
    location: 'Main Library, Reading Area',
    category: 'Building',
    status: 'pending',
    priority: 'urgent',
    createdBy: {
      id: '3',
      username: 'student',
      role: 'student'
    },
    createdAt: '2023-05-16T10:20:00Z',
    updatedAt: '2023-05-16T10:20:00Z'
  },
  {
    id: '4',
    title: 'Flickering Lights',
    description: 'Lights in Room 203 are flickering and causing distractions.',
    location: 'Room 203, Arts Building',
    category: 'Electrical',
    status: 'completed',
    priority: 'low',
    createdBy: {
      id: '1',
      username: 'lecturer',
      role: 'lecturer'
    },
    createdAt: '2023-05-13T11:00:00Z',
    updatedAt: '2023-05-14T09:45:00Z'
  }
];

// Flag to use mock data (true) or real API (false)
const USE_MOCK_DATA = true;

// Create a new maintenance request
const createMaintenanceRequest = async (request: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<MaintenanceResponse> => {
  try {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Maintenance request created:', request);
          resolve({ message: 'Maintenance request submitted successfully' });
        }, 1000);
      });
    } else {
      const response = await axios.post(`${API_URL}/maintenance`, request);
      return response.data;
    }
  } catch (error) {
    console.error('Error creating maintenance request:', error);
    throw error;
  }
};

// Get all maintenance requests
const getAllMaintenanceRequests = async (): Promise<MaintenanceRequest[]> => {
  try {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(MOCK_MAINTENANCE_REQUESTS);
        }, 1000);
      });
    } else {
      const response = await axios.get(`${API_URL}/maintenance`);
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching maintenance requests:', error);
    throw error;
  }
};

// Get maintenance request by ID
const getMaintenanceRequestById = async (id: string): Promise<MaintenanceRequest | null> => {
  try {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const request = MOCK_MAINTENANCE_REQUESTS.find(req => req.id === id) || null;
          resolve(request);
        }, 500);
      });
    } else {
      const response = await axios.get(`${API_URL}/maintenance/${id}`);
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching maintenance request with ID ${id}:`, error);
    throw error;
  }
};

// Update maintenance request status
const updateRequestStatus = async (id: string, status: MaintenanceRequest['status']): Promise<MaintenanceResponse> => {
  try {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Maintenance request ${id} updated to ${status}`);
          resolve({ message: 'Status updated successfully' });
        }, 800);
      });
    } else {
      const response = await axios.patch(`${API_URL}/maintenance/${id}`, { status });
      return response.data;
    }
  } catch (error) {
    console.error(`Error updating maintenance request ${id}:`, error);
    throw error;
  }
};

// Delete maintenance request
const deleteMaintenanceRequest = async (id: string): Promise<MaintenanceResponse> => {
  try {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Maintenance request ${id} deleted`);
          resolve({ message: 'Maintenance request deleted successfully' });
        }, 800);
      });
    } else {
      const response = await axios.delete(`${API_URL}/maintenance/${id}`);
      return response.data;
    }
  } catch (error) {
    console.error(`Error deleting maintenance request ${id}:`, error);
    throw error;
  }
};

const maintenanceService = {
  createMaintenanceRequest,
  getAllMaintenanceRequests,
  getMaintenanceRequestById,
  updateRequestStatus,
  deleteMaintenanceRequest
};

export default maintenanceService; 