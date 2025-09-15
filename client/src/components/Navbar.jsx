import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Stack, Box } from '@mui/material';
import { useAuth } from '../hooks/AuthContext';
import dict from '../utils/dict';


const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(dict.navbar.to.login);
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, textAlign: 'center' }}>
            <Stack direction="row" spacing={2}>
                <Button
                    component={Link}
                    to={dict.navbar.to.home}
                    variant="contained"
                    color="primary"
                >
                    {dict.navbar.title}
                </Button>
                {!isAuthenticated && (
                    <Button
                        component={Link}
                        to={dict.navbar.to.login}
                        variant="outlined"
                        color="primary"
                    >
                        {dict.navbar.login}
                    </Button>
                )}
                {!isAuthenticated && (
                    <Button
                        component={Link}
                        to={dict.navbar.to.register}
                        variant="outlined"
                        color="primary"
                    >
                        {dict.navbar.register}
                    </Button>
                )}
                {isAuthenticated && (
                    <Button
                        component={Link}
                        to={dict.navbar.to.contacts}
                        variant="outlined"
                        color="primary"
                    >
                        {dict.navbar.contacts}
                    </Button>
                )}
                {isAuthenticated && (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleLogout}
                    >
                        {dict.navbar.logout}
                    </Button>
                )}
            </Stack>
        </Box>
    );
};

export default Navbar;
