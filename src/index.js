import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider  } from '@material-ui/core/styles'
import theme from './theme'
import CssBaseline from "@material-ui/core/CssBaseline";


ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
