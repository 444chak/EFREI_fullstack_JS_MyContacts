import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useContactApi from '../hooks/useContactApi';
import dict from '../utils/dict';
import { Box, Stack, TextField, Button, Alert } from '@mui/material';

const CreateContactPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { createContact } = useContactApi();
    const handleCreateContact = async () => {
        setIsLoading(true);
        try {
            await createContact({ firstName, lastName, phone });
            navigate(dict.contactCreate.to.contacts);
            setError('');
        } catch (error) {
            setError(error?.response?.data?.message || 'Create contact failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, textAlign: 'center', width: '100%' }}>
            <h1>{dict.contactCreate.title}</h1>
            <p>{dict.contactCreate.subtitle}</p>
            <Stack sx={{ mt: 2 }} direction="column" spacing={2} component="form" onSubmit={(e) => {
                e.preventDefault();
                handleCreateContact();
            }}>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    label={dict.contactCreate.firstName}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <TextField
                    label={dict.contactCreate.lastName}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <TextField
                    label={dict.contactCreate.phone}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                >
                    {dict.contactCreate.create}
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(dict.contactCreate.to.contacts)}
                >
                    {dict.contactCreate.cancel}
                </Button>
            </Stack>
        </Box>
    );
};

export default CreateContactPage;


