import { createTheme } from '@mui/material/styles';
import { teal, blueGrey,deepPurple } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: teal.A700,
    },
    secondary: {
      main: teal.A400,
    },terce: {
        main: blueGrey[900]
    }
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: teal[900],
    },
    secondary: {
      main: blueGrey[900],
    },
    background: {
      default: blueGrey[700],
      paper: teal[800],
    },
    text: {
      primary: '#ffffff',
      secondary: blueGrey[500],
    },
  },
});