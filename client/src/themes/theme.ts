import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  typography: {
    fontFamily: '"Open Sans", "sans-serif", "Roboto"',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: '#f04040' },
    secondary: { main: '#8c8c8c' },
    text: { secondary: '#ffffff' },
  },
  shape: {
    borderRadius: 5,
  },
  overrides: {
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'inherit',
        },
        backgroundColor: 'inherit',
      },
    },
  },
});
