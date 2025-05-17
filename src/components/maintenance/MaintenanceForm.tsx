import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  CircularProgress,
  Alert,
  Collapse
} from '@mui/material';
import maintenanceService from '../../services/maintenanceService';
import { useAuth } from '../../contexts/AuthContext';
import GridItem from '../common/GridItem';

interface MaintenanceFormProps {
  onRequestSubmitted: () => void;
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ onRequestSubmitted }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handlePriorityChange = (e: SelectChangeEvent) => {
    setPriority(e.target.value as 'low' | 'medium' | 'high' | 'urgent');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to submit a maintenance request');
      return;
    }

    if (!title || !description || !location || !category) {
      setError('Please fill out all required fields');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await maintenanceService.createMaintenanceRequest({
        title,
        description,
        location,
        category,
        priority,
        createdBy: {
          id: user.id || '0',
          username: user.username,
          role: user.role
        }
      });

      // Reset form
      setTitle('');
      setDescription('');
      setLocation('');
      setCategory('');
      setPriority('medium');
      setSuccess(true);

      // Notify parent component
      onRequestSubmitted();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting maintenance request:', err);
      setError('Failed to submit maintenance request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Submit a Maintenance Request
      </Typography>
      
      <Collapse in={success}>
        <Alert 
          severity="success" 
          sx={{ mb: 2 }}
          onClose={() => setSuccess(false)}
        >
          Your maintenance request has been submitted successfully!
        </Alert>
      </Collapse>
      
      <Collapse in={!!error}>
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      </Collapse>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <GridItem xs={12}>
            <TextField
              fullWidth
              required
              label="Title"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
              placeholder="Brief title describing the issue"
            />
          </GridItem>
          
          <GridItem xs={12}>
            <TextField
              fullWidth
              required
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Provide details about the issue"
            />
          </GridItem>
          
          <GridItem xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Location"
              variant="outlined"
              value={location}
              onChange={handleLocationChange}
              placeholder="Building, room number, etc."
            />
          </GridItem>
          
          <GridItem xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Category"
              variant="outlined"
              value={category}
              onChange={handleCategoryChange}
              placeholder="e.g., Electrical, Plumbing, Equipment"
            />
          </GridItem>
          
          <GridItem xs={12}>
            <FormControl fullWidth>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                value={priority}
                label="Priority"
                onChange={handlePriorityChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
              </Select>
            </FormControl>
          </GridItem>
          
          <GridItem xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : "Submit Request"}
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </form>
    </Paper>
  );
};

export default MaintenanceForm; 