import axios from './axios';

export const getEmployeeById = async (id) => {
    const token = localStorage.getItem('token');
    return axios.get(`/employee/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const logout = async () => {
    const token = localStorage.getItem('token');
    return axios.post(
        '/logout',
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const resetPassword = async (currentPassword, newPassword) => {
    const token = localStorage.getItem('token');
    return axios.post(
        '/reset-Password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
    );
};

export const getAllEmployees = async (params) => {
    const token = localStorage.getItem('token');
    return axios.get('/employee', {
        params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
