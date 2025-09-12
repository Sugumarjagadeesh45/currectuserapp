// D:\newapp\userapp-main 2\userapp-main\src\util\backendConfig.tsx
import axios from 'axios';
import { Platform } from 'react-native';

// Use platform-specific backend URLs
const LOCAL_BACKEND = Platform.select({
  android: 'http://10.0.2.2:5001', // Emulator
  ios: 'http://localhost:5001',     // Simulator
  default: 'http://192.168.1.100:5001', // Replace with your host IP for physical devices
});
// Always use local backend
const API_BASE_URL = LOCAL_BACKEND;

// Function to check backend availability
const checkBackendAvailability = async (url: string, timeout = 3000): Promise<boolean> => {
  try {
    const response = await axios.get(`${url}/`, { timeout });
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    console.log(`❌ Backend ${url} is not available:`, error.message);
    return false;
  }
};

// Initialize API with the local backend
export const initializeBackend = async () => {
  console.log('🔍 Checking backend availability...');
  
  const isLocalAvailable = await checkBackendAvailability(LOCAL_BACKEND);
  
  if (isLocalAvailable) {
    console.log('✅ Using local backend:', LOCAL_BACKEND);
  } else {
    console.error('❌ Local backend is not available');
  }
  
  return API_BASE_URL;
};

// Get the current backend URL
export const getBackendUrl = () => {
  return API_BASE_URL;
};
