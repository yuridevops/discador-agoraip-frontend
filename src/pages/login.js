import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react';
import { ConnectionContext } from '../contexts/ConnectionContext';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        AgoraIP
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignInSide() {

  const classes = useStyles();
  const { dispatch } = useContext(AuthContext)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  let history = useHistory()

  const {connection} = useContext(ConnectionContext)
  const BASEURL = connection.ip

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${BASEURL}/authenticate`, data)
      console.log(response.data.user.extension)
      dispatch({
        type: 'LOG_IN',
        name: response.data.user.name,
        token: response.data.token,
        extension: response.data.user.extension,
        logged: true,
      })
      history.push('/campanhas')
    } catch (err) {
      console.log(err)
      alert('Erro na autenticacao')
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Bem vindo ao
          </Typography>
          <Typography component="h1" variant="h5">
            Discador AgoraIP
          </Typography>
          <br />

          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => { setEmail(e.target.value) }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => { setPassword(e.target.value) }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Logar no sistema
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Não tem conta? Faça o cadastro"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}