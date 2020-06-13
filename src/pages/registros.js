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
    height: 550
  },
  paper2:{
      padding: theme.spacing(1),
      textAlign: 'center',
      height: 200
  }
}));

export default function Registros() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}><h1>Registro de campanhas </h1>
        </Paper>
        </Grid>

      </Grid>
    </div>
  );
}

