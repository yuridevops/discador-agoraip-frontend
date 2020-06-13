import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#272c31',
        dark: '#1b1e24',
        light: '#52565c'
    },
    secondary: {
        main: '#818E8E',
        dark: '#232F3E',
        light: '#EEEEEE'
    },
    bar: {
      main: '#0099ff'
    },
    background: {
      default: '#F7F9FC',
      paper: '#fff',
      menu: '#232F3E'
    },
    text:{
      primary: '#191919',
      menu:  '#EEEEEE'
    }
  },
  status: {
    danger: 'orange',
  },
});

export default theme