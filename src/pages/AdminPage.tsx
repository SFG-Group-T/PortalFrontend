import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AdminPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage users, view analytics, and oversee campus services.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminPage; 