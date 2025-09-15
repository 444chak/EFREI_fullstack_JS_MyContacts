import React, { useEffect, useState } from 'react';
import useContactApi from '../hooks/useContactApi';

const ContactsPage = () => {
    const { getContacts } = useContactApi();
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        getContacts()
            .then(setContacts)
            .catch(() => {
                // Silently ignore here; interceptor handles redirect
            });
    }, []);
    return (
        <div>
            <h1>ContactsPage</h1>
            <p>Liste des contacts</p>
            {contacts.map((contact) => (
                <div key={contact._id}>
                    <h2>{contact.firstName} {contact.lastName}</h2>
                    <p>{contact.phone}</p>
                </div>
            ))}
        </div>
    );
};

export default ContactsPage;
