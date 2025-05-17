import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const NotificationsPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View announcements, updates, and important notifications.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotificationsPage; 