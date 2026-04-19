// src/services/userService.js
import api from './api';

export const login = async (name, email, password) => {
    const res = await api.get('/users', {
        params: {email, password }
    });

    return res.data[0]; // json-server devuelve array
};