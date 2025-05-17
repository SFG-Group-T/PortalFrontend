import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  CircularProgress,
  Alert,
  AlertTitle,
  Button,
  Snackbar
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MaintenanceList from '../maintenance/MaintenanceList';
import maintenanceService, { MaintenanceRequest } from '../../services/maintenanceService';

const MaintenanceManagement: React.FC = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  const fetchMaintenanceRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const requests = await maintenanceService.getAllMaintenanceRequests();
      setMaintenanceRequests(requests);
    } catch (err) {
      console.error('Error fetching maintenance requests:', err);
      setError('Failed to load maintenance requests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenanceRequests();
  }, []);

  const handleStatusChange = async (id: string, status: MaintenanceRequest['status']) => {
    try {
      await maintenanceService.updateRequestStatus(id, status);
      setSnackbar({
        open: true,
        message: 'Maintenance request status updated successfully',
        severity: 'success'
      });
      fetchMaintenanceRequests(); // Refresh the list
    } catch (err) {
      console.error('Error updating status:', err);
      setSnackbar({
        open: true,
        message: 'Failed to update maintenance request status',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await maintenanceService.deleteMaintenanceRequest(id);
      setSnackbar({
        open: true,
        message: 'Maintenance request deleted successfully',
        severity: 'success'
      });
      fetchMaintenanceRequests(); // Refresh the list
    } catch (err) {
      console.error('Error deleting request:', err);
      setSnackbar({
        open: true,
        message: 'Failed to delete maintenance request',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Maintenance Requests</Typography>
        <Button 
          startIcon={<RefreshIcon />} 
          onClick={fetchMaintenanceRequests}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : maintenanceRequests.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          No maintenance requests found.
        </Alert>
      ) : (
        <MaintenanceList 
          maintenanceRequests={maintenanceRequests}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default MaintenanceManagement; 