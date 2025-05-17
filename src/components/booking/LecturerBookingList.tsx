import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import { format, parseISO } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import bookingService, { LecturerAppointmentView } from '../../services/bookingService';

interface LecturerBookingListProps {
  bookings: LecturerAppointmentView[];
  onAcceptBooking: (id: number) => void;
  onRejectBooking: (id: number) => void;
  onRefresh: () => void;
}

const LecturerBookingList: React.FC<LecturerBookingListProps> = ({ 
  bookings, 
  onAcceptBooking, 
  onRejectBooking,
  onRefresh
}) => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<'accept' | 'reject'>('accept');
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  // Function to format date and time for display
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'EEEE, MMMM d, yyyy');
    } catch (error) {
      console.error('Error parsing date:', error);
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      return format(parseISO(`2000-01-01T${timeString}`), 'h:mm a');
    } catch (error) {
      console.error('Error parsing time:', error);
      return timeString;
    }
  };

  const handleOpenDialog = (bookingId: number, action: 'accept' | 'reject') => {
    setSelectedBookingId(bookingId);
    setDialogAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmAction = async () => {
    if (selectedBookingId === null) return;
    
    try {
      if (dialogAction === 'accept') {
        await onAcceptBooking(selectedBookingId);
        setSnackbar({
          open: true,
          message: 'Appointment accepted successfully',
          severity: 'success'
        });
      } else {
        await onRejectBooking(selectedBookingId);
        setSnackbar({
          open: true,
          message: 'Appointment rejected successfully',
          severity: 'success'
        });
      }
      onRefresh();
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Error ${dialogAction === 'accept' ? 'accepting' : 'rejecting'} appointment`,
        severity: 'error'
      });
      console.error(`Error ${dialogAction} booking:`, error);
    } finally {
      handleCloseDialog();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  if (bookings.length === 0) {
    return (
      <Card 
        sx={{ 
          py: 4, 
          textAlign: 'center',
          backgroundColor: 'background.paper',
          border: '1px dashed',
          borderColor: 'primary.main',
          borderRadius: 2
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No appointments found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          You don't have any student appointments scheduled
        </Typography>
      </Card>
    );
  }

  return (
    <>
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2
        }}
      >
        {bookings.map((booking) => (
          <Card 
            key={booking.id}
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              backgroundColor: 'background.paper',
              boxShadow: 2,
              borderRadius: 2,
              border: 1,
              borderColor: 'secondary.main',
            }}
          >
            <Box 
              sx={{ 
                p: 1, 
                backgroundColor: 'secondary.main',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Student Appointment
              </Typography>
              <Chip 
                label={booking.serviceType} 
                size="small" 
                sx={{ 
                  backgroundColor: 'white',
                  color: 'secondary.dark',
                  fontWeight: 'bold'
                }} 
              />
            </Box>
            
            <CardContent sx={{ flexGrow: 1, pt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1">
                  {formatDate(booking.date)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1">
                  {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1">
                  {booking.location}
                </Typography>
              </Box>
              
              <Box sx={{ mt: 3, mb: 1.5 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Student Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, mb: 1 }}>
                  <PersonIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '1.2rem' }} />
                  <Typography variant="body2">
                    {booking.studentEmail.split('@')[0].replace('.', ' ')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, mb: 1 }}>
                  <EmailIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '1.2rem' }} />
                  <Typography variant="body2">
                    {booking.studentEmail}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  <BadgeIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '1.2rem' }} />
                  <Typography variant="body2">
                    {booking.studentNumber}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
                <Button 
                  variant="contained" 
                  color="success"
                  sx={{ flexGrow: 1, py: 1 }}
                  startIcon={<CheckCircleIcon />}
                  onClick={() => handleOpenDialog(booking.id, 'accept')}
                >
                  Accept
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
                  sx={{ flexGrow: 1, py: 1 }}
                  startIcon={<CancelIcon />}
                  onClick={() => handleOpenDialog(booking.id, 'reject')}
                >
                  Reject
                </Button>
              </Box>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>
          {dialogAction === 'accept' ? 'Accept Appointment' : 'Reject Appointment'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogAction === 'accept' 
              ? 'Are you sure you want to accept this student appointment request?' 
              : 'Are you sure you want to reject this student appointment request?'
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">Cancel</Button>
          <Button 
            onClick={handleConfirmAction} 
            variant="contained"
            color={dialogAction === 'accept' ? 'success' : 'error'}
            autoFocus
          >
            {dialogAction === 'accept' ? 'Accept' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LecturerBookingList; 