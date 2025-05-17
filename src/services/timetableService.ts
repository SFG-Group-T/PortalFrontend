import { v4 as uuidv4 } from 'uuid';

interface TimeSlot {
  id: string;
  day: string;
  time: string;
  subject: string;
  location: string;
  lecturer: string;
}

interface Note {
  id: string;
  date: string;
  content: string;
  createdAt: string;
}

// Mock timetable data
const MOCK_TIMETABLE: TimeSlot[] = [
  {
    id: '1',
    day: 'Monday',
    time: '09:00 - 10:30',
    subject: 'Web Development',
    location: 'Room 101',
    lecturer: 'Dr. Smith'
  },
  {
    id: '2',
    day: 'Monday',
    time: '11:00 - 12:30',
    subject: 'Database Systems',
    location: 'Room 202',
    lecturer: 'Prof. Johnson'
  },
  {
    id: '3',
    day: 'Tuesday',
    time: '09:00 - 10:30',
    subject: 'Software Engineering',
    location: 'Room 303',
    lecturer: 'Dr. Williams'
  },
  {
    id: '4',
    day: 'Wednesday',
    time: '14:00 - 15:30',
    subject: 'Data Structures',
    location: 'Room 404',
    lecturer: 'Prof. Brown'
  },
  {
    id: '5',
    day: 'Thursday',
    time: '11:00 - 12:30',
    subject: 'Computer Networks',
    location: 'Room 505',
    lecturer: 'Dr. Davis'
  },
  {
    id: '6',
    day: 'Friday',
    time: '09:00 - 10:30',
    subject: 'Operating Systems',
    location: 'Room 606',
    lecturer: 'Prof. Miller'
  }
];

// Mock notes data
const MOCK_NOTES: Note[] = [
  {
    id: '1',
    date: '2024-03-18',
    content: 'Remember to prepare for Web Development presentation',
    createdAt: '2024-03-17T10:00:00Z'
  },
  {
    id: '2',
    date: '2024-03-19',
    content: 'Database Systems quiz next week',
    createdAt: '2024-03-17T11:30:00Z'
  }
];

// Get timetable for a specific day
const getTimetableByDay = (day: string): TimeSlot[] => {
  return MOCK_TIMETABLE.filter(slot => slot.day === day);
};

// Get all timetable slots
const getAllTimetableSlots = (): TimeSlot[] => {
  return MOCK_TIMETABLE;
};

// Get notes for a specific date
const getNotesByDate = (date: string): Note[] => {
  return MOCK_NOTES.filter(note => note.date === date);
};

// Add a new note
const addNote = (date: string, content: string): Note => {
  const newNote: Note = {
    id: uuidv4(),
    date,
    content,
    createdAt: new Date().toISOString()
  };
  MOCK_NOTES.push(newNote);
  return newNote;
};

// Delete a note
const deleteNote = (noteId: string): void => {
  const index = MOCK_NOTES.findIndex(note => note.id === noteId);
  if (index !== -1) {
    MOCK_NOTES.splice(index, 1);
  }
};

const timetableService = {
  getTimetableByDay,
  getAllTimetableSlots,
  getNotesByDate,
  addNote,
  deleteNote
};

export default timetableService; 