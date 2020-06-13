import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'
import { ConnectionContext } from '../contexts/ConnectionContext'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  card: {
    width: '100%',
  },
  containerRight: {
    textAlign: 'right',
    marginTop: 10
  },
  paper: {
    height: 60,
  },
  button: {
    marginTop: 10
  },
  h1: {
    marginLeft: 10
  },
  bar: {
    colorPrimary: '#0099ff',
    barColorPrimary: '#0099ff',
    backgroundColor: '#0099ff',
    color: '#0099ff',
  },
  buttonLink: {
    marginTop: 10,
    textDecoration: 'none'
  }
}));


export default function Campanhas() {

  const [campaigns, setCampaigns] = useState([])
  const { user } = useContext(AuthContext)
  const { connection } = useContext(ConnectionContext) 

  const BASEURL = connection.ip
  const socket = socketIOClient(BASEURL);


  
  //CHAMADA REST 
  useEffect(() => {
    async function fetchData() {
      await axios.get(`${BASEURL}/campaign`, 
      {headers : { Authorization: user.token}})
        .then((data) => {
          setCampaigns(data.data.docs)
        })
        .catch(() => {
        })
    }
    fetchData()

  }, [])

  //UPDATE POR SOCKET
  useEffect(() => {
    socket.on("returnCampaigns", data => {
      setCampaigns(data)
    });
    return () => {
      socket.off("returnCampaigns")
    }
  }, []);




  async function handlePause(item) {
    let updatedCampaign = item
    updatedCampaign.status.activate = 'pausada'
    try {
      await axios.put(`${BASEURL}/campaign/${updatedCampaign._id}`, updatedCampaign,  {headers : { Authorization: user.token}})
      socket.emit('updateCampaigns',item._id)

    } catch (err) {
      console.log(err)
    }
  }

  async function handleActivate(item) {
    let updatedCampaign = item
    updatedCampaign.status.activate = 'ativa'
    try {
      await axios.put(`${BASEURL}/campaign/${updatedCampaign._id}`, updatedCampaign,  {headers : { Authorization: user.token}})
      socket.emit('updateCampaigns',item._id)

    } catch (err) {
      console.log(err)
    }
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h1 className={classes.h1}>Campanhas Ativas</h1>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.containerRight}>
            <Link to='/campanhas/create' >
              <Fab color="secondary" aria-label="add">
                <AddIcon />
              </Fab>
            </Link>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {
          campaigns.filter(campaign => campaign.status.activate === 'ativa').map(campaign =>
            <Grid item xs={12} key={campaign.name}>
              <Card className={classes.card}>
                <CardHeader
                  title={campaign.name}
                  subheader={campaign.mode}
                  action={
                    <>
                      <IconButton aria-label="pause" onClick={(e) => { handlePause(campaign) }}>
                        <PauseIcon />
                      </IconButton>
                      <IconButton aria-label="stop">
                        <StopIcon />
                      </IconButton>
                    </>
                  }
                />
                <CardContent>

                  <LinearProgress variant="determinate" value={campaign.status.progress} color="primary" className={classes.bar} />
                  {
                    campaign.mode !== 'URA' &&
                    <Link className={classes.buttonLink}
                      to={{
                        pathname: `/campanhas/discador/${campaign._id}`
                      }}
                    >
                      <Button variant="contained" color='secondary' className={classes.button}>
                        Participar
                    </Button>
                    </Link>
                  }
                </CardContent>
              </Card>
            </Grid>
          )
        }
        <h1 className={classes.h1}>Campanhas Pausadas</h1>
        {
          campaigns.filter(campaign => campaign.status.activate === 'pausada').map(campaign =>
            <Grid item xs={12} key={campaign.name}>
              <Card className={classes.card}>
                <CardHeader
                  title={campaign.name}
                  subheader={campaign.mode}
                  action={
                    <>
                      <IconButton aria-label="stop">
                        <StopIcon  />
                      </IconButton>
                    </>
                  }
                />
                <CardContent>
                  <LinearProgress variant="determinate" value={campaign.status.progress} className={classes.bar} />
                  <Button variant="contained" className={classes.button} color='secondary' onClick={(e) => { handleActivate(campaign) }}>
                    Iniciar
                </Button>
                </CardContent>
              </Card>
            </Grid>
          )
        }

      </Grid>
    </div >
  );
}


