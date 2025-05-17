import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  FormControlLabel, 
  FormLabel, 
  MenuItem, 
  Paper, 
  Radio, 
  RadioGroup, 
  Stack, 
  TextField, 
  Typography,
  Snackbar,
  Alert,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';

import bookingService, { 
  BookingType, 
  RoomBooking, 
  AppointmentBooking, 
  roomLocations, 
  lecturerNames 
} from '../../services/bookingService';

interface BookingFormProps {
  onSuccess: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSuccess }) => {
  const theme = useTheme();
  const [bookingType, setBookingType] = useState<BookingType>('ROOM');
  const [location, setLocation] = useState('');
  const [lecturerName, setLecturerName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleBookingTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookingType(event.target.value as BookingType);
    // Reset location when changing booking type
    setLocation('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!date || !startTime || !endTime || !location) {
      setSnackbar({
        open: true,
        message: 'Please fill out all required fields',
        severity: 'error'
      });
      return;
    }

    // Check if appointment booking requires lecturer name
    if (bookingType === 'APPOINTMENT' && !lecturerName) {
      setSnackbar({
        open: true,
        message: 'Please select a lecturer for your appointment',
        severity: 'error'
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Create booking object based on type
      const bookingData = bookingType === 'ROOM' 
        ? {
            serviceType: 'ROOM' as const,
            location,
            date,
            startTime,
            endTime
          } as RoomBooking
        : {
            serviceType: 'APPOINTMENT' as const,
            location,
            lecturerName,
            date,
            startTime,
            endTime
          } as AppointmentBooking;
      
      // Call the service to create the booking
      const response = await bookingService.createBooking(bookingData);
      
      setSnackbar({
        open: true,
        message: response.message,
        severity: 'success'
      });
      
      // Reset form
      setBookingType('ROOM');
      setLocation('');
      setLecturerName('');
      setDate('');
      setStartTime('');
      setEndTime('');
      
      // Notify parent component of success
      onSuccess();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error creating booking. Please try again.',
        severity: 'error'
      });
      console.error('Error submitting booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        backgroundColor: 'background.paper',
        border: 1,
        borderColor: 'primary.main',
        borderRadius: 2
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom color="primary">
        New Booking
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <Stack spacing={3}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ color: 'primary.main' }}>Booking Type</FormLabel>
            <RadioGroup
              row
              name="booking-type"
              value={bookingType}
              onChange={handleBookingTypeChange}
            >
              <FormControlLabel 
                value="ROOM" 
                control={<Radio />} 
                label="Room Booking" 
              />
              <FormControlLabel 
                value="APPOINTMENT" 
                control={<Radio />} 
                label="Lecturer Appointment" 
              />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            inputProps={{ min: new Date().toISOString().split('T')[0] }}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Start Time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              sx={{ flex: 1 }}
              inputProps={{ step: 300 }}
            />
            
            <TextField
              label="End Time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              sx={{ flex: 1 }}
              inputProps={{ step: 300 }}
            />
          </Box>

          {bookingType === 'ROOM' ? (
            <FormControl fullWidth>
              <TextField
                select
                label="Room Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              >
                {roomLocations.map((roomLocation) => (
                  <MenuItem key={roomLocation} value={roomLocation}>
                    {roomLocation}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          ) : (
            <>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Lecturer"
                  value={lecturerName}
                  onChange={(e) => setLecturerName(e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                >
                  {lecturerNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              
              <FormControl fullWidth>
                <TextField
                  select
                  label="Office Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                >
                  {['Science Building, Office 105', 'Engineering Block, Office 210', 'Arts Center, Office 310', 'Business School, Office 120'].map((office) => (
                    <MenuItem key={office} value={office}>
                      {office}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              py: 1.5,
            }}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Create Booking'}
          </Button>
        </Stack>
      </Box>
      
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
    </Paper>
  );
};

export default BookingForm; 