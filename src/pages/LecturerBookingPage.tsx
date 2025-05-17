import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  useTheme,
  Card,
  CardContent,
  Divider,
  Avatar,
  Chip,
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid';
import GridItem from '../components/common/GridItem';
import { useLocation, useNavigate } from 'react-router-dom';
import LecturerBookingList from '../components/booking/LecturerBookingList';
import bookingService, { LecturerAppointmentView } from '../services/bookingService';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { format, parseISO } from 'date-fns';

const LecturerBookingPage: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<LecturerAppointmentView[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<LecturerAppointmentView | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Parse the bookingId from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const bookingId = params.get('id');
    
    if (bookingId && bookings.length > 0) {
      const booking = bookings.find(b => b.id === parseInt(bookingId));
      setSelectedBooking(booking || null);
    } else {
      setSelectedBooking(null);
    }
  }, [location.search, bookings]);

  useEffect(() => {
    const fetchLecturerBookings = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getLecturerBookings();
        setBookings(data);
        
        // Check if we need to select a specific booking
        const params = new URLSearchParams(location.search);
        const bookingId = params.get('id');
        
        if (bookingId) {
          const booking = data.find(b => b.id === parseInt(bookingId));
          setSelectedBooking(booking || null);
        }
      } catch (error) {
        console.error('Error fetching lecturer bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecturerBookings();
  }, [refreshTrigger, location.search]);

  const handleAcceptBooking = async (bookingId: number) => {
    return await bookingService.acceptBooking(bookingId);
  };

  const handleRejectBooking = async (bookingId: number) => {
    return await bookingService.rejectBooking(bookingId);
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleBackToList = () => {
    navigate('/lecturer/bookings');
  };

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

  // Render detailed view of a specific booking
  const renderBookingDetail = () => {
    if (!selectedBooking) return null;
    
    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToList}
            sx={{ mr: 2 }}
          >
            Back to all appointments
          </Button>
          <Typography variant="h5" component="h2">
            Appointment Details
          </Typography>
        </Box>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3}>
            <GridItem xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Appointment Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarTodayIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="body1">
                      <strong>Date:</strong> {formatDate(selectedBooking.date)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccessTimeIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="body1">
                      <strong>Time:</strong> {formatTime(selectedBooking.startTime)} - {formatTime(selectedBooking.endTime)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="body1">
                      <strong>Location:</strong> {selectedBooking.location}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </GridItem>
            
            <GridItem xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Student Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        mb: 2,
                        bgcolor: 'secondary.main',
                        fontSize: '1.5rem'
                      }}
                    >
                      {selectedBooking.studentEmail.split('@')[0].charAt(0).toUpperCase()}
                    </Avatar>
                    
                    <Typography variant="h6">
                      {selectedBooking.studentEmail.split('@')[0].replace('.', ' ')}
                    </Typography>
                    
                    <Chip 
                      label={selectedBooking.studentNumber} 
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {selectedBooking.studentEmail}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </GridItem>
            
            <GridItem xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => {
                    handleAcceptBooking(selectedBooking.id);
                    handleRefresh();
                    handleBackToList();
                  }}
                  sx={{ px: 4, py: 1 }}
                >
                  Accept Appointment
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => {
                    handleRejectBooking(selectedBooking.id);
                    handleRefresh();
                    handleBackToList();
                  }}
                  sx={{ px: 4, py: 1 }}
                >
                  Reject Appointment
                </Button>
              </Box>
            </GridItem>
          </Grid>
        </Paper>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {!selectedBooking && (
          <>
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              Student Appointments
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              View and manage student appointment requests
            </Typography>
          </>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {selectedBooking ? (
              renderBookingDetail()
            ) : (
              <Paper sx={{ mt: 3, p: 3, backgroundColor: 'background.paper' }}>
                <LecturerBookingList 
                  bookings={bookings} 
                  onAcceptBooking={handleAcceptBooking}
                  onRejectBooking={handleRejectBooking}
                  onRefresh={handleRefresh}
                />
              </Paper>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default LecturerBookingPage; 