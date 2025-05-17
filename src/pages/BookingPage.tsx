import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const BookingPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Service Booking
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Book study rooms, schedule appointments, and manage your reservations.
        </Typography>
      </Box>
    </Container>
  );
};

export default BookingPage; 