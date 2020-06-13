import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 10,
        marginBottom: 20
    },
    input: {
        display: 'none',
    },
}));

export default function UploadButton({title, handleChange}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input
                accept=".csv"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                 
                onChange={handleChange}
            />
            <label htmlFor="contained-button-file">
                <Button color='secondary' variant="contained" component="span">
                    {title}
               </Button>
            </label>
        </div>
    );
}