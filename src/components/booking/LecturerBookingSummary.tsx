import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Avatar,
  Stack,
  Chip,
  CircularProgress
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import bookingService, { LecturerAppointmentView } from '../../services/bookingService';

const LecturerBookingSummary: React.FC = () => {
  const [bookings, setBookings] = useState<LecturerAppointmentView[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getLecturerBookings();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching lecturer bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Function to format date and time for display
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      return format(parseISO(`2000-01-01T${timeString}`), 'h:mm a');
    } catch (error) {
      return timeString;
    }
  };

  // Get student initials from email
  const getInitials = (email: string) => {
    const name = email.split('@')[0].replace('.', ' ');
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('');
  };

  const handleViewAllBookings = () => {
    navigate('/lecturer/bookings');
  };

  const handleBookingClick = (bookingId: number) => {
    navigate(`/lecturer/bookings?id=${bookingId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upcoming Appointments
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
            No upcoming appointments
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Sort bookings by date (ascending)
  const sortedBookings = [...bookings].sort((a, b) => 
    new Date(a.date + 'T' + a.startTime).getTime() - 
    new Date(b.date + 'T' + b.startTime).getTime()
  );

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upcoming Appointments
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Stack spacing={1.5}>
          {sortedBookings.slice(0, 5).map((booking) => (
            <Box 
              key={booking.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderRadius: 1,
                bgcolor: 'background.paper',
                boxShadow: 1,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: 3,
                  bgcolor: 'rgba(0, 0, 0, 0.01)'
                }
              }}
              onClick={() => handleBookingClick(booking.id)}
            >
              <Avatar 
                sx={{ 
                  bgcolor: 'secondary.main',
                  width: 40,
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                {getInitials(booking.studentEmail)}
              </Avatar>
              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  {booking.studentEmail.split('@')[0].replace('.', ' ')}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(booking.date)}
                  </Typography>
                  <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary', ml: 1, mr: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">
                    {formatTime(booking.startTime)}
                  </Typography>
                </Box>
              </Box>
              <Chip
                label={booking.studentNumber}
                size="small"
                sx={{ ml: 1, fontSize: '0.7rem' }}
              />
            </Box>
          ))}
        </Stack>
        
        {bookings.length > 5 && (
          <Typography 
            variant="body2" 
            color="primary" 
            align="right" 
            sx={{ mt: 2, fontWeight: 'medium', cursor: 'pointer' }}
            onClick={handleViewAllBookings}
          >
            View all ({bookings.length})
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default LecturerBookingSummary; 