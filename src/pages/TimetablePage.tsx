import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const TimetablePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Timetable
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage your class schedule and academic timetable.
        </Typography>
      </Box>
    </Container>
  );
};

export default TimetablePage; 