import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthApi from '../hooks/useAuthApi';
import { useAuth } from '../hooks/AuthContext';
import dict from '../utils/dict';
import { TextField, Button, Stack, Box, Alert } from '@mui/material';
import useApiErrors from '../hooks/useApiErrors';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { formError, setFromError, resetErrors, getFieldError, setFormError } = useApiErrors();
    const [isLoading, setIsLoading] = useState(false);

    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();
    const authApi = useAuthApi();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(dict.register.to.contacts);
        }
    }, [isAuthenticated, navigate]);

    const handleRegister = async () => {
        setIsLoading(true);
        if (password !== confirmPassword) {
            setFormError('Passwords do not match');
            setIsLoading(false);
            return;
        }
        try {
            resetErrors();
            await authApi.register({ email, password });
            navigate(dict.register.to.contacts);
        } catch (error) {
            setFromError(error, 'Register failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, textAlign: 'center' }}>
            <Stack
                direction="column"
                spacing={2}
            >
                <h1>{dict.register.title}</h1>
                <Stack
                    direction="column"
                    spacing={2}
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleRegister();
                    }}
                >
                    {formError && <Alert severity="error">{formError}</Alert>}
                    <TextField
                        label={dict.register.email}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        error={Boolean(getFieldError('email'))}
                        helperText={getFieldError('email')}
                    />
                    <TextField
                        label={dict.register.password}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        error={Boolean(getFieldError('password'))}
                        helperText={getFieldError('password')}
                    />
                    <TextField
                        label={dict.register.confirmPassword}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        error={Boolean(getFieldError('confirmPassword'))}
                        helperText={getFieldError('confirmPassword')}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isLoading}
                    >
                        {dict.register.register}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default RegisterPage;
