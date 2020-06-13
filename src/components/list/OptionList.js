import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { useEffect, useState } from 'react';
import api from '../../services/services'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

export default function OptionList() {
    const [campaigns, setCampaigns] = useState(null)
    useEffect(() => {
        async function fetchData() {
            await api.get('/campaign')
                .then((data) => {
                    setCampaigns(data.data.docs)
                })
                .catch(() => {
                })
        }
        fetchData()
    }, [])

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid item xs={12}>
                <div className={classes.demo}>
                    {
                        campaigns !== null &&
                        <List>
                            {
                                campaigns.map(item =>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                item.name
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            }
                        </List>
                    }

                </div>
            </Grid>

        </div>
    );
}