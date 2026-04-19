import api from './api';

export const register = async (name, email, password) => {

    const res = await api.post('/register', {
        name,
        email,
        password
    });

    const { accessToken, user } = res.data;

    // Guardar token
    localStorage.setItem('token', accessToken);

    return user;
};

export const isLogin = () => {
    const token = localStorage.getItem('token');
    return token !== null && token !== '';
};