import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: import.meta.env.VITE_TIMEOUT
});

// ==========================
// INTERCEPTOR REQUEST
// ==========================
api.interceptors.request.use(
    (config) => {
        config.headers.StatusFront = 'ok'
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ==========================
// INTERCEPTOR RESPONSE
// ==========================
api.interceptors.response.use(
    (response) => {
        // Si todo sale bien, simplemente retorna la respuesta
        return response;
    },
    (error) => {

        // Verifica si hay respuesta del servidor
        if (error.response) {

            const status = error.response.status;

            // 🚨 Manejo global de errores
            switch (status) {

                case 401:
                    console.warn('No autorizado - Token inválido o expirado');

                    // Eliminar token
                    localStorage.removeItem('token');

                    // Redirigir al login
                    window.location.href = '/login';

                    break;

                case 403:
                    console.warn('Acceso prohibido');
                    break;

                case 404:
                    console.warn('Recurso no encontrado');
                    break;

                case 500:
                    console.error('Error interno del servidor');
                    break;

                default:
                    console.error('Error:', error.response.data);
            }

        } else {
            // Error sin respuesta (ej: red caída o timeout)
            console.error('Error de red o servidor no disponible');
        }

        return Promise.reject(error);
    }
);

export default api;