import React, { useEffect, useState } from 'react';
import useContactApi from '../hooks/useContactApi';
import { Snackbar, Alert } from '@mui/material';
import dict from '../utils/dict';

const ContactsPage = () => {
    const { getContacts } = useContactApi();
    const [contacts, setContacts] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        getContacts()
            .then(setContacts)
            .catch(() => {
                // Silently ignore here; interceptor handles redirect
            });
    }, [getContacts]);

    useEffect(() => {
        const loggedIn = new URLSearchParams(window.location.search).get('loggedIn');
        if (loggedIn) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <div>
            {loggedIn && <Snackbar open={loggedIn} onClose={() => setLoggedIn(false)}>
                <Alert severity="success" variant="outlined">{dict.contacts.loggedIn}</Alert>
            </Snackbar>}
            <h1>{dict.contacts.title}</h1>
            <p>{dict.contacts.list}</p>
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
