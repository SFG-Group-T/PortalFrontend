import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BuildIcon from '@mui/icons-material/Build';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import GridItem from '../components/common/GridItem';

const Dashboard: React.FC = () => {
  const { user, isAdmin, isLecturer, isStudent } = useAuth();

  const upcomingEvents = [
    { id: 1, title: 'Math Lecture', date: '2023-05-20 10:00', location: 'Room 101' },
    { id: 2, title: 'Computer Science Lab', date: '2023-05-21 14:00', location: 'Lab 3' },
    { id: 3, title: 'Study Group Meeting', date: '2023-05-22 16:00', location: 'Library' }
  ];

  const notifications = [
    { id: 1, message: 'Your room booking has been confirmed', date: '2023-05-19 09:30' },
    { id: 2, message: 'New assignment posted in Computer Science', date: '2023-05-18 15:45' },
    { id: 3, message: 'Campus maintenance scheduled for this weekend', date: '2023-05-17 11:20' }
  ];

  const studentContent = (
    <>
      <GridItem xs={12} md={6}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Upcoming Classes
          </Typography>
          <List>
            {upcomingEvents.map((event) => (
              <React.Fragment key={event.id}>
                <ListItem>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={event.title} 
                    secondary={`${event.date} - ${event.location}`} 
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="outlined" 
              component={Link} 
              to="/timetable"
              startIcon={<EventIcon />}
            >
              View Full Timetable
            </Button>
          </Box>
        </Paper>
      </GridItem>
      <GridItem xs={12} md={6}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <GridItem xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Book a Room
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Reserve study rooms or meeting spaces
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to="/booking"
                    startIcon={<MeetingRoomIcon />}
                  >
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Report Issue
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Report maintenance or facility issues
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to="/maintenance"
                    startIcon={<BuildIcon />}
                  >
                    Report
                  </Button>
                </CardActions>
              </Card>
            </GridItem>
          </Grid>
        </Paper>
      </GridItem>
    </>
  );

  const lecturerContent = (
    <>
      <GridItem xs={12} md={6}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Upcoming Classes to Teach
          </Typography>
          <List>
            {upcomingEvents.map((event) => (
              <React.Fragment key={event.id}>
                <ListItem>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={event.title} 
                    secondary={`${event.date} - ${event.location}`} 
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="outlined" 
              component={Link} 
              to="/timetable"
              startIcon={<EventIcon />}
            >
              View Teaching Schedule
            </Button>
          </Box>
        </Paper>
      </GridItem>
      <GridItem xs={12} md={6}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Faculty Resources
          </Typography>
          <Grid container spacing={2}>
            <GridItem xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Reserve Equipment
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Book projectors, laptops, and other teaching tools
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to="/booking"
                    startIcon={<MeetingRoomIcon />}
                  >
                    Reserve
                  </Button>
                </CardActions>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Report Issue
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Report classroom or equipment problems
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to="/maintenance"
                    startIcon={<BuildIcon />}
                  >
                    Report
                  </Button>
                </CardActions>
              </Card>
            </GridItem>
          </Grid>
        </Paper>
      </GridItem>
    </>
  );

  const adminContent = (
    <>
      <GridItem xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography>
            Welcome to the admin dashboard. Use the navigation menu to access administrative functions.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              component={Link} 
              to="/admin"
              startIcon={<BuildIcon />}
            >
              Admin Panel
            </Button>
          </Box>
        </Paper>
      </GridItem>
    </>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.username}!
      </Typography>
      
      <Grid container spacing={3}>
        {/* Role-specific content */}
        {isStudent && studentContent}
        {isLecturer && lecturerContent}
        {isAdmin && adminContent}
        
        {/* Common content for all users */}
        <GridItem xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Notifications
            </Typography>
            <List>
              {notifications.map((notification) => (
                <React.Fragment key={notification.id}>
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={notification.message} 
                      secondary={notification.date} 
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="outlined" 
                component={Link} 
                to="/notifications"
                startIcon={<NotificationsIcon />}
              >
                View All Notifications
              </Button>
            </Box>
          </Paper>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard; 