import axios from './axios';

export const createTicket = async (Data) => {
    const token = localStorage.getItem('token');
    return axios.post('/ticket', Data, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateTicket = async (id, Data) => {
    const token = localStorage.getItem('token');
    return axios.put(`/ticket/${id}`, Data, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteTicketById = (id) => {
    const token = localStorage.getItem('token');
    return axios.delete(`/ticket/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
export const getAllTicket = async (params) => {
    const token = localStorage.getItem('token');
    return axios.get('/ticket', {
        params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
export const getTicketById = async (id) => {
    const token = localStorage.getItem('token');
    return axios.get(`/ticket/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const downloadTicketExcel = async (params) => {
    const token = localStorage.getItem('token');
    return axios.get('/ticket-excel', {
        params,
        responseType: 'blob',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
