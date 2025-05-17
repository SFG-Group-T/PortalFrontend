import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Mock user data for development
const MOCK_USERS = {
  admin: {
    username: 'admin',
    password: 'admin123',
    token: 'mock-admin-token',
    role: 'admin'
  },
  lecturer: {
    username: 'lecturer',
    password: 'lecturer123',
    token: 'mock-lecturer-token',
    role: 'lecturer'
  },
  student: {
    username: 'student',
    password: 'student123',
    token: 'mock-student-token',
    role: 'student'
  }
};

// Development mode flag - set to true to use mock authentication
const USE_MOCK_AUTH = true;

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: string;
  username: string;
}

interface RegisterStudentRequest {
  username: string;
  password: string;
  email: string;
  cellNumbers: string;
  address: string;
  role: 'STUDENT';
  studentNumber: string;
  course: string;
}

interface RegisterLecturerRequest {
  username: string;
  password: string;
  email: string;
  cellNumbers: string;
  address: string;
  role: 'LECTURER';
  fullName: string;
  department: string;
  office: string;
}

type RegisterRequest = RegisterStudentRequest | RegisterLecturerRequest;

interface RegisterResponse {
  message: string;
}

const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  if (USE_MOCK_AUTH) {
    // Mock authentication for development
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser = Object.values(MOCK_USERS).find(
          user => user.username === credentials.username && user.password === credentials.password
        );
        
        if (mockUser) {
          const userData = {
            token: mockUser.token,
            role: mockUser.role,
            username: mockUser.username
          };
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500); // Simulate network delay
    });
  }
  
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/api/v1/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

const register = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  if (USE_MOCK_AUTH) {
    // Mock registration for development
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mock registration successful:', userData);
        resolve({ message: 'Registration successful' });
      }, 500); // Simulate network delay
    });
  }
  
  try {
    const response = await axios.post<RegisterResponse>(`${API_URL}/api/v1/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

const logout = (): void => {
  localStorage.removeItem('user');
};

const getCurrentUser = (): LoginResponse | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

const authService = {
  login,
  register,
  logout,
  getCurrentUser,
};

export default authService; 