import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

const API_URL = 'http://51.21.106.196:8000/auth/login';

export const login = async ({email, password}: {email: string; password: string}) => {
  try {
    const response = await fetch(API_URL, {
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
