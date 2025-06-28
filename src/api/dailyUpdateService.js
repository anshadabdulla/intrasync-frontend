import axios from './axios';

const token = localStorage.getItem('token');
const headers = {
    Authorization: `Bearer ${token}`
};

export const createDailyUpdate = async (data) => {
    return axios.post('/dailyUpdate', data, { headers });
};

export const updateDailyUpdate = async (id, data) => {
    return axios.put(`/dailyUpdate/${id}`, data, { headers });
};

export const deleteDailyUpdateById = async (id) => {
    return axios.delete(`/dailyUpdate/${id}`, { headers });
};

export const getAllDailyUpdates = async (params) => {
    return axios.get('/dailyUpdate', {
        params,
        headers
    });
};

export const getDailyUpdateById = async (id) => {
    return axios.get(`/dailyUpdate/${id}`, { headers });
};

export const downloadDailyUpdateExcel = async (params) => {
    return axios.get('/dailyUpdate-excel', {
        params,
        responseType: 'blob',
        headers
    });
};

export const getMyDailyUpdates = async () => {
    return axios.get('/my-dailyUpdate', { headers });
};
