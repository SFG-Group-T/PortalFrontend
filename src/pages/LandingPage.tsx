import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper, 
  Grid, 
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import GridItem from '../components/common/GridItem';

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8, mt: 4 }}>
          <SchoolIcon sx={{ fontSize: 60, color: 'white', mb: 2 }} />
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="bold"
            color="white"
            sx={{ 
              mb: 2,
              fontSize: isMobile ? '2.5rem' : '3.5rem',
            }}
          >
            Group T Student Portal
          </Typography>
          <Typography 
            variant="h5" 
            color="white" 
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto', opacity: 0.9 }}
          >
            Welcome to your campus hub for learning, resources, and student services
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <GridItem xs={12} md={5}>
            <Paper sx={{ 
              p: 4, 
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 8
              }
            }}>
              <LoginIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2, mx: 'auto' }} />
              <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
                Sign In
              </Typography>
              <Typography sx={{ mb: 3, flexGrow: 1 }}>
                Already have an account? Sign in to access your courses, timetable, and campus resources.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                component={RouterLink} 
                to="/login"
                sx={{ 
                  py: 1.5,
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}
              >
                Sign In
              </Button>
            </Paper>
          </GridItem>

          <GridItem xs={12} md={5}>
            <Paper sx={{ 
              p: 4, 
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 8
              }
            }}>
              <HowToRegIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2, mx: 'auto' }} />
              <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
                Register
              </Typography>
              <Typography sx={{ mb: 3, flexGrow: 1 }}>
                New to Group T? Create an account to join our campus community and access all student services.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                component={RouterLink} 
                to="/register"
                sx={{ 
                  py: 1.5,
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}
              >
                Register Now
              </Button>
            </Paper>
          </GridItem>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 8, color: 'white' }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} Group T Student Portal. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage; 