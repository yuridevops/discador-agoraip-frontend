import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CampanhaIcon from '@material-ui/icons/MenuBook'
import RegistroIcon from '@material-ui/icons/RecentActors'
import RelatoriosIcon from '@material-ui/icons/Assessment'
import ExtrairIcon from '@material-ui/icons/Share'
import { Link } from 'react-router-dom'
import logo from '../../statics/imgs/logo.png'




const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    buttonLink: {
        textDecoration: 'none',
        color: '#272c34'
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',

    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    img: {
        //marginTop: 10
    },
    menuIcon: {
        color: theme.palette.secondary.main
    },
    menuText: {
        color: theme.palette.secondary.light
    },
    paper: {
        backgroundColor: theme.palette.background.menu
    }

}));

export default function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);





    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (

        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img className={classes.img} src={logo} alt="" width="70" height="50" />
                    <Typography variant='h6' color='secondary' ><strong>Discador</strong></Typography>

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"

                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                        [classes.paper]: classes.paper
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link to='/campanhas' className={classes.buttonLink}>
                        <ListItem button key='campanhas'>
                            <ListItemIcon>
                                <CampanhaIcon className={classes.menuIcon} />
                            </ListItemIcon>
                            <ListItemText primary='Campanhas' className={classes.menuText} />
                        </ListItem>
                    </Link>
                    <Link to='/registros' className={classes.buttonLink}>
                        <ListItem button key='registro'>
                            <ListItemIcon>
                                <RegistroIcon className={classes.menuIcon} />
                            </ListItemIcon>
                            <ListItemText primary='Registros' className={classes.menuText} />
                        </ListItem>
                    </Link>
                    <Link to='/relatorios' className={classes.buttonLink}>
                        <ListItem button key='relatorios'>
                            <ListItemIcon>
                                <RelatoriosIcon className={classes.menuIcon} />
                            </ListItemIcon>
                            <ListItemText primary='Relatórios' className={classes.menuText} />
                        </ListItem>
                    </Link>
                    <Link to='/compartilhar' className={classes.buttonLink}>
                        <ListItem button key='compartilhar'>
                            <ListItemIcon>
                                <ExtrairIcon className={classes.menuIcon} />
                            </ListItemIcon>
                            <ListItemText primary='Compartilhar' className={classes.menuText} />
                        </ListItem>
                    </Link>
                </List>

            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>

    );
}
