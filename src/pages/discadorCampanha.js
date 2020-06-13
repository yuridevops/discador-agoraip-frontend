import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import PauseIcon from '@material-ui/icons/Pause';
import IconButton from '@material-ui/core/IconButton';
import socketIOClient from "socket.io-client"
import { useHistory } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import BlockIcon from '@material-ui/icons/Block';
import CallIcon from '@material-ui/icons/Call';
import { useContext } from 'react';
import { ConnectionContext } from '../contexts/ConnectionContext'
import { AuthContext } from '../contexts/AuthContext';





const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1

    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '55vh',
        backgroundColor: theme.palette.background.paper
    },
    paper2: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        height: '31vh',
        backgroundColor: '#fff'
    },
    containerRight: {
        textAlign: 'right',
        marginTop: 20
    },
    containerLeft: {
        textAlign: 'left',
        marginTop: 30
    },
    divIcons: {
        marginTop: 60,
    }
}));

export default function Index(props) {
    const classes = useStyles();
    const [campaign, setCampaign] = useState()
    const [customer, setCustomer] = useState(null)
    const { user } = useContext(AuthContext)
    const { connection } = useContext(ConnectionContext)
    const [called, setCalled] = useState(false)

    let BASEURL = connection.ip
    const socket = socketIOClient(BASEURL);
    let history = useHistory()


    useEffect(() => {
        socket.on("returnEspecificCampaign", data => {
            console.log(data.status.progress)
            if (data.status.activate === 'pausada' || data.status.activate === 'encerrada') {
                history.push('/campanhas')
            }
        });
        return () => {
            socket.off("returnEspecificCampaign")
        }
    }, []);


    useEffect(() => {
        async function fetchData() {
            const reqCampaign = await axios.get(`${BASEURL}/campaign/${props.match.params.id}`,
            { headers: { Authorization: user.token } })
            setCampaign(reqCampaign.data)
            pushCustomer()
        }
        fetchData()
        return () => {
            axios.put(`${BASEURL}/campaign/prevent/${props.match.params.id}`,
                { customer: JSON.parse(localStorage.getItem('customer')) },
                { headers: { Authorization: user.token } })
            localStorage.removeItem('customer')
        }
    }, [])


    async function handleClick(value) {
        const index = campaign.customerData.findIndex(item => item.id === customer.id)
        const updateCampaing = campaign
        updateCampaing.customerData[index].status = value

        await axios.put(`${BASEURL}/campaign/${props.match.params.id}`,
            updateCampaing,
            { headers: { Authorization: user.token } })

        localStorage.removeItem('customer')
        pushCustomer()
    }

    async function handleCall(){
        const {extension} =  JSON.parse(localStorage.getItem('user'))
        axios.post(`${BASEURL}/campaign/call`,
        { phone: customer.telefone,
          extension: extension
        },
        { headers: { Authorization: user.token }}
        )
        setCalled(true)
    }

    async function pushCustomer() {
        if (localStorage.getItem('customer')) {
            setCustomer(JSON.parse(localStorage.getItem('customer')))
        }
        else {
            const reqCustomer = await axios.get(`${BASEURL}/campaign/customer/${props.match.params.id}`,
                { headers: { Authorization: user.token } })
            if (reqCustomer.data.finish) {
                localStorage.removeItem('customer')
                socket.emit("updateCampaigns")
                history.push('/campanhas')
            } else {
                setCustomer(reqCustomer.data)
                localStorage.setItem('customer', JSON.stringify(reqCustomer.data))
                socket.emit("updateCampaigns")
            }
            setCalled(false)
        }
    }

    return (
        <div className={classes.root}>
            {
                campaign === null || customer === null ?
                    <h1>Aguarde a campanha ser carregada</h1>
                    :
                    <Grid container spacing={1}>

                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <h2>Informacoes do cliente</h2>
                                <div className={classes.containerLeft}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <span>Nome: {customer.nome}</span>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <span>CPF: {customer.cpf}</span>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <span>Telefone: {customer.telefone}</span>
                                        </Grid>
                                    </Grid>
                                </div>
                                <Grid container spacing={1} className={classes.divIcons} alignItems='center' justify='center'>
                                    {
                                        called ? 
                                        <>
                                        <Grid item xs={4}>
                                            <IconButton aria-label="positive" value='positive' onClick={(e) => handleClick('positive')}>
                                                <ThumbUpIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <IconButton aria-label="negative" value='negative' onClick={(e) => handleClick('negative')}>
                                                <ThumbDownIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <IconButton aria-label="error" value='unreachable' onClick={(e) => handleClick('unreachable')}>
                                                <BlockIcon />
                                            </IconButton>
                                        </Grid>
                                        </>
                                        :
                                        <Grid item xs={4} >
                                            <IconButton aria-label="call" value='call' onClick={(e) => handleCall()}>
                                                <CallIcon/>
                                            </IconButton>
                                        </Grid>
                                    }

                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}><h1>Info Cliente</h1></Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper2}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <h3>Informacoes da campanha</h3>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <div className={classes.containerRight}>
                                            <IconButton aria-label="pause" >
                                                <PauseIcon />
                                            </IconButton>
                                        </div>
                                    </Grid >

                                    <Grid item xs={12}>
                                        <span>Titulo: {campaign.name}</span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <span>Descricao: {campaign.description}</span>
                                    </Grid>
                                </Grid>
                                <LinearProgress variant="determinate" value={campaign.status.progress} color="primary" />

                            </Paper>
                        </Grid>
                    </Grid>
            }
        </div>
    );
}

