import axios from './axios';

export const login = async (email, password) => {
    return axios.post('/login', { email, password });
};

export const forgotPassword = async (email) => {
    return axios.post('/forgot-Password', { email });
};
