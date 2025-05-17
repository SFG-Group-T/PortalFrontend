import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const MaintenancePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Maintenance Requests
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Report and track maintenance issues across campus facilities.
        </Typography>
      </Box>
    </Container>
  );
};

export default MaintenancePage; 