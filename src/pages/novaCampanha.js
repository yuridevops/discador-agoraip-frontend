import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import CheckboxList from '../components/checkBoxList/CheckBoxList';
import DetailedTable from '../components/detailedTable/DetailedTable';

import SimpleButton from '../components/button/SimpleButton';
import DropUpload from '../components/dropUpload/DropUpload';
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ConnectionContext } from '../contexts/ConnectionContext';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        width: '100%',
    },
    paperList: {
        width: '100%',
        padding: theme.spacing(1),
        textAlign: 'left',
    },
    formCampanha: {
        width: '100%',
    },
    inputCampanha: {
        width: '100%',
        marginTop: 20
    },
    containerRight: {
        textAlign: 'right',
        marginTop: 20,
        marginBottom: 20
    },
    labelStylized: {
        marginTop: 40
    }
}));

export default function NovaCampanha() {
    const classes = useStyles();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [mode, setMode] = useState('Preditiva')
    const [date, setDate] = useState(new Date());
    const [extensions, setExtensions] = useState([]);
    const [checked, setChecked] = React.useState([]);
    const [customerData, setCustomerData] = useState({
        columns: [
            { title: 'Nome', field: 'nome' },
            { title: 'CPF', field: 'cpf' },
            { title: 'Telefone', field: 'telefone' },
        ],
        data: []
    })

    const { connection } = useContext(ConnectionContext)
    const BASEURL = connection.ip

    const { user } = useContext(AuthContext)
    const socket = socketIOClient(BASEURL);
    let history = useHistory();

    async function handleOnDrop(data) {
        let iterateCsv = new Promise(resolve => {
            let clientes = []
            data.forEach((item, index) => {
                if (index !== 0 && data.length !== index + 1) {
                    clientes.push({
                        nome: item.data[0],
                        cpf: item.data[1],
                        telefone: item.data[2],
                    })

                }
            })
            resolve(clientes)
        })

        let clientes = await iterateCsv

        setCustomerData({
            ...customerData,
            data: clientes
        })

    }

    function handleOnError(err, file, inputElem, reason) {
        console.log(err)
    }

    function handleOnRemoveFile(data) {
        setCustomerData({
            ...customerData,
            data: []
        })
    }

    useEffect(() => {
        async function fetchData() {
            await axios.get(`${BASEURL}/campaign/getextensions`,
                { headers: { Authorization: user.token } })
                .then((res) => {
                    setExtensions(res.data.data)
                })
                .catch(() => {
                })
        }
        fetchData()
    }, [])



    async function handleSubmit(e) {
        e.preventDefault();
        if (customerData.data.length < 1) {
            alert('Arquivo CSV Obrigatorio')
            return
        }
        if (mode === 'URA' && checked.length < 1) {
            alert('Escolha ao menos um ramal')
            return
        }

        const data = {
            name: name,
            description: description,
            mode: mode,
            extensions: checked,
            date: date,
            status: {
            },
            customerData: customerData.data
        }
        await axios.post(`${BASEURL}/campaign`, data,
            { headers: { Authorization: user.token } })
            .then(() => {
                alert('Campanha cadastrada com sucesso')
                socket.emit('updateCampaigns')
                history.push('/campanhas')
            })
            .catch(() => {

                alert('Falha ao cadastrar campanha')
            })
    }


    return (

        <div className={classes.root}>


            <form className={classes.formCampanha} autoComplete="off" onSubmit={handleSubmit}>

                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <h1>Cadastrar nova Campanha</h1>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.containerRight}>
                            <SimpleButton title='Concluir' />
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>

                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <h2>Informacoes da Campanha</h2>
                            <TextField className={classes.inputCampanha} value={name} onChange={(e) => { setName(e.target.value) }} required label="Nome da Campanha" />
                            <TextField className={classes.inputCampanha} value={description} onChange={(e) => { setDescription(e.target.value) }} required label="Descrição da Campanha" />
                            <FormControl required className={classes.inputCampanha}>
                                <InputLabel id="demo-simple-select-label">Tipo da campanha</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={mode}
                                    onChange={(e) => { setMode(e.target.value) }}
                                >
                                    <MenuItem value={'Preditiva'}>Preditiva</MenuItem>
                                    <MenuItem value={'Power'}>Power</MenuItem>
                                    <MenuItem value={'URA'}>URA Inteligente</MenuItem>
                                </Select>
                            </FormControl>
                            {
                                mode === 'URA' &&
                                <>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                        <KeyboardDateTimePicker
                                            className={classes.inputCampanha}
                                            variant="inline"
                                            ampm={false}
                                            value={date}
                                            onChange={setDate}
                                            label="Selecione a data e a hora da campanha"
                                            onError={console.log}
                                            disablePast
                                            format="dd/MM/yyyy hh:mm a"
                                        />
                                    </MuiPickersUtilsProvider>
                                </>

                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            {
                                mode === 'URA' ?
                                    <>
                                        <h2>Ramais participantes</h2>
                                        <CheckboxList checked={checked} setChecked={setChecked} itens={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                                    </>
                                    :
                                    <h2>Menu disponivel apenas para o campanha tipo URA</h2>

                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paperList}>
                            <DropUpload handleOnDrop={handleOnDrop} handleOnError={handleOnError} handleOnRemoveFile={handleOnRemoveFile} />
                            <br />
                            <DetailedTable
                                state={customerData}
                                setState={setCustomerData}
                                title='Lista de Clientes'
                            />
                        </Paper>
                    </Grid>

                </Grid>
            </form>
        </div>
    );
}

