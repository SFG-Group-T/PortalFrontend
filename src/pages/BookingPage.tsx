import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  useTheme
} from '@mui/material';
import BookingForm from '../components/booking/BookingForm';
import BookingList from '../components/booking/BookingList';
import bookingService, { RoomBooking, AppointmentBooking } from '../services/bookingService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`booking-tabpanel-${index}`}
      aria-labelledby={`booking-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>}
    </div>
  );
};

const BookingPage: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [bookings, setBookings] = useState<(RoomBooking | AppointmentBooking)[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getMyBookings();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [refreshTrigger]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBookingSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    setActiveTab(1); // Switch to "My Bookings" tab
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await bookingService.cancelBooking(bookingId);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Booking Services
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Book rooms, labs, and appointments with lecturers
        </Typography>

        <Paper 
          sx={{ 
            mt: 3,
            backgroundColor: 'background.paper',
            '& .MuiTabs-root': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
            },
            '& .MuiTab-root': {
              color: 'primary.contrastText',
              '&.Mui-selected': {
                color: theme.palette.secondary.main,
              },
            },
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
          >
            <Tab label="New Booking" />
            <Tab label="My Bookings" />
          </Tabs>

          <TabPanel value={activeTab} index={0}>
            <BookingForm onSuccess={handleBookingSuccess} />
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <BookingList 
                bookings={bookings} 
                onCancelBooking={handleCancelBooking} 
              />
            )}
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default BookingPage; 