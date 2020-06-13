import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
        
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 400,
    backgroundColor: theme.palette.background.paper
  },
  paper2:{
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: 140,
      backgroundColor: '#fff'
  }
}));

export default function Index() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>

        <Grid item xs={6}>
          <Paper className={classes.paper}><h1>Softphone</h1></Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}><h1>Info Cliente</h1></Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper2}><h1>Campanha ativa</h1></Paper>
        </Grid>
      </Grid>
    </div>
  );
}

