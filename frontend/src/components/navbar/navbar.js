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
        fontFamily: 'Kalam, cursive',
    },
    button: {
        margin: theme.spacing(1),
        fontFamily: 'Averia Sans Libre, cursive',
    },
}));


export default function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        EaseMyशादी
                    </Typography>

                    <Button
                        color="inherit"
                        className={classes.button}
                        startIcon={<AddBox />}
                        size="x-large"
                    >
                        Services
                    </Button>

                    <Button
                        color="inherit"
                        className={classes.button}
                        startIcon={<ShoppingCart />}
                        size="x-large"
                    >
                        Cart
                    </Button>

                    <Auth />

                </Toolbar>
            </AppBar>
        </div>
    );
}