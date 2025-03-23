import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

const API_URL_BASE = 'http://51.21.106.196:8000/';

export const login = async ({email, password}: {email: string; password: string}) => {
  try {
    const response = await fetch(`${API_URL_BASE}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'FSCC-PLATFORM': Platform.OS,
        'FSCC-PLATFORM-VERSION': String(Platform.Version),
      },
      body: JSON.stringify({email, password}),
    });
    const data = await response.json();

    if (response.ok) {
      console.log('Login successful: ', data);
      await AsyncStorage.setItem('authToken', data.access_token);
      return data.token;
    } else {
      throw new Error(data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.warn('Login failed:', error);
    throw error;
  }
};

export const getToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

export const getAuthHeaders = async () => {
  const token = await getToken();

  return {
    access_token: token,
    'Content-Type': 'application/json',
    'FSCC-PLATFORM': Platform.OS,
    'FSCC-PLATFORM-VERSION': String(Platform.Version),
  };
};

export const logout = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL_BASE}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'FSCC-PLATFORM': Platform.OS,
        'FSCC-PLATFORM-VERSION': String(Platform.Version),
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Logged out successfully: ', data);

      await AsyncStorage.removeItem('authToken');
      return data.message || 'Logout successful';
    } else {
      throw new Error(data.message || 'Logout failed');
    }
  } catch (error) {
    console.warn('Logout failed:', error);
    throw error;
  }
};
