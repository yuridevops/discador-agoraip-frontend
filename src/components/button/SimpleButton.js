import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        
    }
}));

export default function ({ title, handleChange }) {
    const classes = useStyles()
    return (
        <Button variant="contained" color="secondary" type="submit" className={classes.root}>
            {
                title
            }
        </Button>
    )
}
