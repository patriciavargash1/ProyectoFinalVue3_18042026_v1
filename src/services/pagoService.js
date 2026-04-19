// src/services/pagoService.js
import api from './api';

// Obtener pagos de creditos
export const getPago = (creditoId) => {
    return api.get('/pagos', {
        params: { creditoId }
    });
};

// Crear pago
export const createPago = (pago) => {
    return api.post('/pagos', pago);
};

// Actualizar pago
export const updatePago = (id, pago) => {
    return api.put(`/pagos/${id}`, pago);
};

// Eliminar pago
export const deletePago = (id) => {
    return api.delete(`/pagos/${id}`);
};