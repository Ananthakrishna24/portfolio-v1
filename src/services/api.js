//For Development
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:7222/api';
const API_BASE_URL = 'https://portfolio-v1-nk24.onrender.com';

export const sendUserData = async (userData) => {
  try {
    //For Development
    //const response = await fetch(`${API_BASE_URL}/create-portfolio`, {
    const response = await fetch(`${API_BASE_URL}/api/create-portfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending user data:', error);
    throw error;
  }
};