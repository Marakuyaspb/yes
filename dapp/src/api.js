import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your Django backend URL

export const createWeb3User = async (address) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/web3users/`, { address });
    return response.data;
  } catch (error) {
    console.error("Error creating Web3User:", error);
    throw error;
  }
};

export const createConnect = async (web3user) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/connects/`, { web3user });
    return response.data;
  } catch (error) {
    console.error("Error creating Connect:", error);
    throw error;
  }
};

export const createVoting = async (voice, web3user) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/votings/`, { voice, web3user });
    return response.data;
  } catch (error) {
    console.error("Error creating Voting:", error);
    throw error;
  }
};