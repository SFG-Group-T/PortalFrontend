import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import GridItem from '../common/GridItem';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    cellNumbers: '',
    address: '',
    role: 'STUDENT',
    // Student specific fields
    studentNumber: '',
    course: '',
    // Lecturer specific fields
    fullName: '',
    department: '',
    office: ''
  });
  
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setFormData({
      ...formData,
      role: e.target.value as string
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Invalid email address');
      return;
    }

    try {
      const userData = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        cellNumbers: formData.cellNumbers,
        address: formData.address,
        role: formData.role,
        ...(formData.role === 'STUDENT' 
          ? { 
              studentNumber: formData.studentNumber,
              course: formData.course
            } 
          : {
              fullName: formData.fullName,
              department: formData.department,
              office: formData.office
            }
        )
      };

      await register(userData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center">
            Register for Smart Campus Portal
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <GridItem xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role"
                    name="role"
                    value={formData.role}
                    label="Role"
                    onChange={handleRoleChange}
                  >
                    <MenuItem value="STUDENT">Student</MenuItem>
                    <MenuItem value="LECTURER">Lecturer</MenuItem>
                  </Select>
                </FormControl>
              </GridItem>

              {/* Common fields */}
              <GridItem xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </GridItem>
              <GridItem xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </GridItem>
              <GridItem xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </GridItem>
              <GridItem xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </GridItem>
              <GridItem xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="cellNumbers"
                  label="Cell Number"
                  id="cellNumbers"
                  value={formData.cellNumbers}
                  onChange={handleChange}
                />
              </GridItem>
              <GridItem xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </GridItem>

              {/* Student specific fields */}
              {formData.role === 'STUDENT' && (
                <>
                  <GridItem xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="studentNumber"
                      label="Student Number"
                      id="studentNumber"
                      value={formData.studentNumber}
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="course"
                      label="Course"
                      id="course"
                      value={formData.course}
                      onChange={handleChange}
                    />
                  </GridItem>
                </>
              )}

              {/* Lecturer specific fields */}
              {formData.role === 'LECTURER' && (
                <>
                  <GridItem xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="fullName"
                      label="Full Name"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="department"
                      label="Department"
                      id="department"
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="office"
                      label="Office"
                      id="office"
                      value={formData.office}
                      onChange={handleChange}
                    />
                  </GridItem>
                </>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 