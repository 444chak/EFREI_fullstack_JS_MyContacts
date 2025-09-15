import api from '../services/api';

export default function useContactApi() {
    const getContacts = async () => {
        const { data } = await api.get('/contacts');
        return data;
    };

    return { getContacts };
}

