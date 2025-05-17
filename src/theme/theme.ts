import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black as primary color
      light: '#333333',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1976d2', // Blue for larger cards
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    background: {
      default: '#e6e8fc', // Light lavender/blue background color
      paper: '#ffffff', // White for cards
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          borderRadius: 8,
          border: '1px solid rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          '&:hover': {
            boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#e6e8fc',
        },
      },
    },
  },
});

export default theme; 