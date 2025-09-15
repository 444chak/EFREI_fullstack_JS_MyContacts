import api from '../services/api';
import { useAuth } from './AuthContext';

export default function useAuthApi() {
    const { login: setAuthToken, logout: clearAuth } = useAuth();

    const login = async ({ email, password }) => {
        const { data } = await api.post('/auth/login', { email, password });
        setAuthToken(data.token);
        return data;
    };

    const register = async ({ name, email, password }) => {
        const { data } = await api.post('/auth/register', { name, email, password });
        return data;
    };

    const logout = () => {
        clearAuth();
    };

    return { login, register, logout };
}


