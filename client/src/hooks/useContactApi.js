import api from '../services/api';

export default function useContactApi() {
    const getContacts = async () => {
        const { data } = await api.get('/contacts');
        return data;
    };

    const updateContact = async (id, updatedContact) => {
        const { data } = await api.patch(`/contacts/${id}`, updatedContact);
        return data;
    };

    const deleteContact = async (id) => {
        const { data } = await api.delete(`/contacts/${id}`);
        return data;
    };

    return { getContacts, updateContact, deleteContact };
}

