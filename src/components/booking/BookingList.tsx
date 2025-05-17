import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Typography,
  useTheme
} from '@mui/material';
import { format, parseISO } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

import { AppointmentBooking, RoomBooking } from '../../services/bookingService';

interface BookingListProps {
  bookings: (RoomBooking | AppointmentBooking)[];
  onCancelBooking: (id: string) => void;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, onCancelBooking }) => {
  const theme = useTheme();

  // Helper function to determine if a booking is an appointment
  const isAppointment = (booking: RoomBooking | AppointmentBooking): booking is AppointmentBooking => {
    return booking.serviceType === 'APPOINTMENT';
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

  if (bookings.length === 0) {
    return (
      <Card 
        sx={{ 
          py: 4, 
          textAlign: 'center',
          backgroundColor: 'background.paper',
          border: '1px dashed',
          borderColor: 'primary.main'
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No bookings found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Create a new booking to see it here
        </Typography>
      </Card>
    );
  }

  return (
    <Box 
      sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 2
      }}
    >
      {bookings.map((booking, index) => (
        <Card 
          key={index}
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            boxShadow: 2,
            borderRadius: 2,
            border: 1,
            borderColor: booking.serviceType === 'APPOINTMENT' ? 'secondary.main' : 'primary.main',
          }}
        >
          <Box 
            sx={{ 
              p: 1, 
              backgroundColor: booking.serviceType === 'APPOINTMENT' ? 'secondary.main' : 'primary.main',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {booking.serviceType === 'APPOINTMENT' ? 'Appointment' : 'Room Booking'}
            </Typography>
            <Chip 
              label={booking.serviceType} 
              size="small" 
              sx={{ 
                backgroundColor: 'white',
                color: booking.serviceType === 'APPOINTMENT' ? 'secondary.dark' : 'primary.dark',
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
            
            {isAppointment(booking) && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1">
                  {booking.lecturerName}
                </Typography>
              </Box>
            )}
          </CardContent>
          
          <CardActions sx={{ p: 2, pt: 0 }}>
            <Button 
              variant="outlined" 
              color="error"
              fullWidth
              onClick={() => onCancelBooking(index.toString())}
              sx={{
                borderColor: 'error.main',
                color: 'error.main',
                '&:hover': {
                  backgroundColor: 'error.main',
                  color: 'white',
                },
              }}
            >
              Cancel Booking
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default BookingList; 