// src/services/noteService.js
import api from './api';

// Obtener creditos por asesor
export const getCredito = (userId) => {
    return api.get('/creditos', {
        params: { userId }
    });
};

// Crear credito
export const createCredito = (credito) => {
    return api.post('/creditos', credito);
};

// Actualizar credito
export const updateCredito = (id, credito) => {
    return api.put(`/creditos/${id}`, credito);
};

// Eliminar credito
export const deleteCredito = (id) => {
    return api.delete(`/creditos/${id}`);
};