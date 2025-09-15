import React from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import dict from '../utils/dict';
import { Box, Button } from '@mui/material';

const HomePage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, textAlign: 'center', width: '100%' }}>
            <h1>{dict.home.title}</h1>
            <p>{dict.home.subtitle}</p>
            {!isAuthenticated && (
                <Button variant="contained" color="primary" onClick={() => navigate(dict.navbar.to.login)}>
                    {dict.home.login}
                </Button>
            )}
            {isAuthenticated && (
                <Button variant="contained" color="primary" onClick={() => navigate(dict.navbar.to.contacts)}>
                    {dict.home.contacts}
                </Button>
            )}
        </Box>
    );
};

export default HomePage;
