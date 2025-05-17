import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import timetableService from '../services/timetableService';
import NoteManager from '../components/timetable/NoteManager';
import { TimetableSlot, Note } from '../types/timetable';

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
      id={`timetable-tabpanel-${index}`}
      aria-labelledby={`timetable-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const TimetablePage: React.FC = () => {
  const theme = useTheme();
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [timetableSlots, setTimetableSlots] = useState(timetableService.getAllTimetableSlots());
  const [notes, setNotes] = useState(timetableService.getNotesByDate(selectedDate));

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handleDayChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedDay(newValue);
  };

  const handleAddNote = (date: string, content: string) => {
    const newNote = timetableService.addNote(date, content);
    setNotes([...notes, newNote]);
  };

  const handleDeleteNote = (noteId: string) => {
    timetableService.deleteNote(noteId);
    setNotes(notes.filter(note => note.id !== noteId));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Timetable
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          View your class schedule and manage notes for each day.
        </Typography>

        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3,
          mt: 3
        }}>
          <Box>
            <Paper 
              sx={{ 
                width: '100%', 
                mb: 2,
                backgroundColor: 'background.paper',
                '& .MuiTabs-root': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                },
                '& .MuiTab-root': {
                  color: 'primary.contrastText',
                  '&.Mui-selected': {
                    color: 'secondary.main',
                  },
                },
              }}
            >
              <Tabs
                value={selectedDay}
                onChange={handleDayChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                {days.map((day) => (
                  <Tab key={day} label={day} />
                ))}
              </Tabs>
            </Paper>

            <Paper sx={{ 
              p: 2,
              backgroundColor: 'background.paper',
              '& .MuiListItem-root': {
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              },
            }}>
              <List>
                {timetableService.getTimetableByDay(days[selectedDay]).map((slot, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={slot.subject}
                        secondary={`${slot.time} - ${slot.location}`}
                        primaryTypographyProps={{
                          color: 'primary.main',
                          fontWeight: 'medium',
                        }}
                      />
                    </ListItem>
                    {index < timetableService.getTimetableByDay(days[selectedDay]).length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Box>

          <Box>
            <NoteManager
              selectedDate={selectedDate}
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default TimetablePage; 