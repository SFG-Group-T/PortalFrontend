import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';

interface Note {
  id: string;
  date: string;
  content: string;
  createdAt: string;
}

interface NoteManagerProps {
  selectedDate: string;
  notes: Note[];
  onAddNote: (date: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const NoteManager: React.FC<NoteManagerProps> = ({
  selectedDate,
  notes,
  onAddNote,
  onDeleteNote
}) => {
  const theme = useTheme();
  const [newNote, setNewNote] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(selectedDate, newNote.trim());
      setNewNote('');
      setIsDialogOpen(false);
    }
  };

  return (
    <Paper sx={{ 
      p: 2, 
      mt: 2,
      backgroundColor: 'secondary.main',
      color: 'secondary.contrastText',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" color="inherit">
          Notes for {format(new Date(selectedDate), 'MMMM d, yyyy')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsDialogOpen(true)}
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Add Note
        </Button>
      </Box>

      <List sx={{ 
        backgroundColor: 'background.paper',
        borderRadius: 1,
        p: 1,
      }}>
        {notes.map((note) => (
          <ListItem 
            key={note.id} 
            divider
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemText
              primary={note.content}
              secondary={format(new Date(note.createdAt), 'MMM d, yyyy h:mm a')}
              primaryTypographyProps={{
                color: 'primary.main',
                fontWeight: 'medium',
              }}
            />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                onClick={() => onDeleteNote(note.id)}
                sx={{
                  color: 'primary.main',
                  '&:hover': {
                    color: 'primary.dark',
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        {notes.length === 0 && (
          <ListItem>
            <ListItemText 
              primary="No notes for this date"
              primaryTypographyProps={{
                color: 'text.secondary',
              }}
            />
          </ListItem>
        )}
      </List>

      <Dialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
          },
        }}
      >
        <DialogTitle sx={{ color: 'primary.main' }}>Add Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note"
            fullWidth
            multiline
            rows={4}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'primary.main',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.dark',
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setIsDialogOpen(false)}
            sx={{ color: 'primary.main' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddNote} 
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NoteManager; 