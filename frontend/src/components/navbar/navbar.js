import React from 'react';
import Auth from '../auth/auth.js';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AddBox from '@material-ui/icons/AddBox';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
}));


export default function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={[classes.title, "appName"].join(' ')}>
                        Wedding Planner
                    </Typography>

                    <Button
                        color="inherit"
                        className={classes.button}
                        startIcon={<AddBox />}
                    >
                        Services
                    </Button>

                    <Button
                        color="inherit"
                        className={classes.button}
                        startIcon={<ShoppingCart />}
                    >
                        Cart
                    </Button>

                    <Auth />

                </Toolbar>
            </AppBar>
        </div>
    );
}