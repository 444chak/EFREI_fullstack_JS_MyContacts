import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

function Footer() {
    return (
        <Box component="footer" sx={{ mt: 'auto', borderTop: 1, borderColor: 'divider', py: 2, backgroundColor: 'background.paper' }}>
            <Container maxWidth="lg">
                <Typography variant="body2" color="text.secondary" align="center">
                    <Link href="https://cv.chkb.fr" target="_blank" rel="noopener noreferrer" underline="hover">
                        made by 444chak
                    </Link>
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
