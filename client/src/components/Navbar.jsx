import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Stack, Box } from '@mui/material';
import { useAuth } from '../hooks/AuthContext';


const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, textAlign: 'center' }}>
            <Stack direction="row" spacing={2}>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="primary"
                >
                    MyContacts
                </Button>
                {!isAuthenticated && (
                    <Button
                        component={Link}
                        to="/login"
                        variant="outlined"
                        color="primary"
                    >
                        Connexion
                    </Button>
                )}
                {!isAuthenticated && (
                    <Button
                        component={Link}
                        to="/register"
                        variant="outlined"
                        color="primary"
                    >
                        Inscription
                    </Button>
                )}
                {isAuthenticated && (
                    <Button
                        component={Link}
                        to="/contacts"
                        variant="outlined"
                        color="primary"
                    >
                        Contacts
                    </Button>
                )}
                {isAuthenticated && (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleLogout}
                    >
                        Déconnexion
                    </Button>
                )}
            </Stack>
        </Box>
    );
};

export default Navbar;
