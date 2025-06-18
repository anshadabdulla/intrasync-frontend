import axios from './axios';

export const getEmployeeById = async (id) => {
    const token = localStorage.getItem('token');
    return axios.get(`/getEmployeeById/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const logout = async () => {
    const token = localStorage.getItem('token');
    return axios.post('/logout', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
