import React, { useEffect, useState } from 'react';
import useContactApi from '../hooks/useContactApi';
import { Snackbar, Alert, Box, Stack, Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import dict from '../utils/dict';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import useApiErrors from '../hooks/useApiErrors';
import useDimensions from '../hooks/useDimensions';

const columns = [
    { id: 'firstName', label: dict.contacts.firstName, size: 100 },
    { id: 'lastName', label: dict.contacts.lastName, size: 100 },
    { id: 'phone', label: dict.contacts.phone, size: 100 },
];

const ContactsPage = () => {
    const { getContacts, updateContact, deleteContact } = useContactApi();
    const [contacts, setContacts] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [updatedContact, setUpdatedContact] = useState({});
    const { formError, setFromError, resetErrors, getFieldError } = useApiErrors();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const dataGridColumns = columns.map((column) => ({ field: column.id, headerName: column.label, flex: column.size }));
    const navigate = useNavigate();
    useEffect(() => {
        getContacts()
            .then(setContacts)
            .catch(() => {
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const loggedIn = new URLSearchParams(window.location.search).get('loggedIn');
        if (loggedIn) {
            setLoggedIn(true);
        }
    }, []);

    const handleUpdateContact = async () => {
        try {
            resetErrors();
            await updateContact(selectedContact._id, updatedContact);
            setUpdatedContact({});
            setSelectedContact(null);
            refreshContacts();
            setOpen(false);
            setOpenSnackbar(true);
            setSnackbarMessage(dict.contacts.updated);
        } catch (error) {
            setFromError(error, dict.contacts.updateError || 'Update failed');
        }
    };

    const refreshContacts = async () => {
        const response = await getContacts();
        setContacts(response);
    };

    const handleDeleteContact = async () => {
        try {
            resetErrors();
            await deleteContact(selectedContact._id);
            refreshContacts();
            setOpen(false);
            setOpenSnackbar(true);
            setSnackbarMessage(dict.contacts.deleted);
        } catch (error) {
            setFromError(error, dict.contacts.deleteError || 'Delete failed');
        }
    };

    const { isXs, isSm } = useDimensions();
    const containerWidth = isXs ? '95%' : isSm ? '85%' : '60%';

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, textAlign: 'center', width: '100%', }}>

            <Stack
                direction="column"
                spacing={2}
                sx={{ mb: 4, mt: 2 }}
            >
                <h1>{dict.contacts.title}</h1>
                <p>{dict.contacts.label}</p>
                <p>{dict.contacts.subtitle}</p>
                <Button variant="contained" color="primary" onClick={() => navigate(dict.contacts.to.createContact)} icon={<Add />}>
                    {dict.contacts.createContact}
                </Button>
            </Stack>
            <Box sx={{ height: '100%', width: containerWidth, display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', mx: 'auto', mb: 4 }}>
                <DataGrid
                    rows={contacts}
                    columns={dataGridColumns}
                    getRowId={(row) => row._id}
                    pageSizeOptions={[10, 20, 50]}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 }
                        }
                    }}
                    pagination
                    rowSelection={false}
                    onRowClick={(params) => {
                        setSelectedContact(params.row);
                        setUpdatedContact({
                            firstName: params.row.firstName,
                            lastName: params.row.lastName,
                            phone: params.row.phone
                        });
                        setOpen(true);
                    }}


                />
            </Box>
            {loggedIn && <Snackbar open={loggedIn} onClose={() => setLoggedIn(false)}>
                <Alert severity="success" variant="outlined">{dict.contacts.loggedIn}</Alert>
            </Snackbar>}
            <Dialog open={open} onClose={() => setOpen(false)}>
                {selectedContact && (
                    <>
                        <DialogTitle>{selectedContact.firstName} {selectedContact.lastName}</DialogTitle>
                        <DialogContent>
                            <Stack sx={{ mt: 2 }} direction="column" spacing={2} component="form" onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateContact();
                            }}>
                                {formError && <Alert severity="error">{formError}</Alert>}
                                <input type="hidden" value={selectedContact._id} />

                                <TextField
                                    label={dict.contacts.firstName}
                                    value={updatedContact.firstName}
                                    onChange={(e) => setUpdatedContact({ ...updatedContact, firstName: e.target.value })}
                                    error={Boolean(getFieldError('firstName'))}
                                    helperText={getFieldError('firstName')}
                                />
                                <TextField
                                    label={dict.contacts.lastName}
                                    value={updatedContact.lastName}
                                    onChange={(e) => setUpdatedContact({ ...updatedContact, lastName: e.target.value })}
                                    error={Boolean(getFieldError('lastName'))}
                                    helperText={getFieldError('lastName')}
                                />
                                <TextField
                                    label={dict.contacts.phone}
                                    value={updatedContact.phone}
                                    onChange={(e) => setUpdatedContact({ ...updatedContact, phone: e.target.value })}
                                    error={Boolean(getFieldError('phone'))}
                                    helperText={getFieldError('phone')}
                                />
                                <Button variant="contained" color="primary" type="submit">
                                    {dict.contacts.update}
                                </Button>
                                <Button variant="contained" color="error" type="button" onClick={handleDeleteContact}>
                                    {dict.contacts.deleteContact}
                                </Button>
                                <Button variant="outlined" type="button" onClick={() => setOpen(false)}>
                                    {dict.contacts.cancel}
                                </Button>

                            </Stack>
                        </DialogContent>
                    </>
                )}
            </Dialog>
            <Snackbar open={openSnackbar} onClose={() => setOpenSnackbar(false)} autoHideDuration={3000}>
                <Alert severity="success" variant="outlined" >{snackbarMessage}</Alert>
            </Snackbar>
        </Box>
    );
};

export default ContactsPage;
