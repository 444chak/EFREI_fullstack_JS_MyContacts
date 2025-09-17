import React from 'react';
import { Stack, TextField, Button, Box, Alert, Snackbar, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthApi from '../hooks/useAuthApi';
import { useAuth } from '../hooks/AuthContext';
import dict from '../utils/dict';
import useApiErrors from '../hooks/useApiErrors';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { formError, setFromError, resetErrors, getFieldError } = useApiErrors();
    const [isLoading, setIsLoading] = useState(false);
    const [sessionExpired, setSessionExpired] = useState(false);
    const { isAuthenticated } = useAuth();
    const [needLogin, setNeedLogin] = useState(false);
    const navigate = useNavigate();
    const authApi = useAuthApi();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(dict.login.to.contacts + '?loggedIn=true');
        } else {
            const needLogin = new URLSearchParams(window.location.search).get('needLogin');
            if (needLogin) {
                setNeedLogin(true);
            }
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            resetErrors();
            await authApi.login({ email, password });
            navigate(dict.login.to.contacts);
        } catch (error) {
            setFromError(error, 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const sessionExpired = new URLSearchParams(window.location.search).get('sessionExpired');
        if (sessionExpired) {
            setSessionExpired(true);
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, textAlign: 'center' }}>
            <Stack
                direction="column"
                spacing={2}
            >
                <h1>{dict.login.title}</h1>
                <Stack
                    direction="column"
                    spacing={2}
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >
                    {formError && <Alert severity="error">{formError}</Alert>}
                    <TextField
                        label={dict.login.email}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        error={Boolean(getFieldError('email'))}
                        helperText={getFieldError('email')}
                    />
                    <TextField
                        label={dict.login.password}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        error={Boolean(getFieldError('password'))}
                        helperText={getFieldError('password')}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : dict.login.login}
                    </Button>

                </Stack>
            </Stack>
            <Snackbar open={sessionExpired} onClose={() => setSessionExpired(false)}>
                <Alert severity="warning" variant="outlined" onClose={() => { setSessionExpired(false); console.log('closed') }}>{dict.login.sessionExpired}</Alert>
            </Snackbar>
            <Snackbar open={needLogin} onClose={() => setNeedLogin(false)}>
                <Alert severity="error" variant="outlined">{dict.login.needLogin}</Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginPage;
