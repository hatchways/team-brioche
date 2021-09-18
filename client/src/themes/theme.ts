import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
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
  },
  shape: {
    borderRadius: 5,
  },
  spacing: (factor) => `${2 * factor}rem`,
});
