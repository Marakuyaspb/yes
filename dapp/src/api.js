import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your Django backend URL

export const createWeb3User = async (address) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/web3users/`, { address });
    return response.data;
  } catch (error) {
    console.error("Error creating Web3User:", error.response ? error.response.data : error);
    throw error;
  }
};

export const createConnect = async (address) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/connects/`, { address });
    return response.data;
  } catch (error) {
    console.error("Error creating Connect:", error.response ? error.response.data : error);
    throw error;
  }
};

export const createVoting = async (voice, address) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/votings/`, { voice, address });
    return response.data;
  } catch (error) {
    console.error("Error creating Voting:", error.response ? error.response.data : error);
    throw error;
  }
};