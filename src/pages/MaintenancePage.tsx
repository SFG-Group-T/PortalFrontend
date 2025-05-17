import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper, CircularProgress, Alert, Divider } from '@mui/material';
import MaintenanceForm from '../components/maintenance/MaintenanceForm';
import maintenanceService, { MaintenanceRequest } from '../services/maintenanceService';
import { useAuth } from '../contexts/AuthContext';
import GridItem from '../components/common/GridItem';

const MaintenancePage: React.FC = () => {
  const { user } = useAuth();
  const [userRequests, setUserRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserRequests = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    try {
      const allRequests = await maintenanceService.getAllMaintenanceRequests();
      // Filter requests for the current user
      const filteredRequests = allRequests.filter(
        req => req.createdBy.username === user.username
      );
      setUserRequests(filteredRequests);
    } catch (err) {
      console.error('Error fetching user maintenance requests:', err);
      setError('Failed to load your maintenance requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRequests();
  }, [user]);

  const handleRequestSubmitted = () => {
    fetchUserRequests();
  };

  // Status chip colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'in-progress': return 'info';
      case 'completed': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Maintenance Requests
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Report and track maintenance issues across campus facilities.
        </Typography>

        <Grid container spacing={3}>
          <GridItem xs={12} md={6}>
            <MaintenanceForm onRequestSubmitted={handleRequestSubmitted} />
          </GridItem>
          
          <GridItem xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Your Maintenance Requests
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : userRequests.length === 0 ? (
                <Alert severity="info">
                  You haven't submitted any maintenance requests yet.
                </Alert>
              ) : (
                <Box>
                  {userRequests.map((request) => (
                    <Paper
                      key={request.id}
                      elevation={0}
                      variant="outlined"
                      sx={{ p: 2, mb: 2 }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {request.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            bgcolor: getStatusColor(request.status),
                            color: 'white',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            textTransform: 'capitalize'
                          }}
                        >
                          {request.status}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {request.location} • {request.category} • {new Date(request.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" noWrap>
                        {request.description}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              )}
            </Paper>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export default MaintenancePage; 