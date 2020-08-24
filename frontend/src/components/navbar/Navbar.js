import React from "react";
import Auth from "../auth/Auth.js";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCart from "@material-ui/icons/Storefront";
import AddBox from "@material-ui/icons/AddBox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Kalam, cursive",

  },
  button: {
    margin: theme.spacing(1),
    fontFamily: "Averia Sans Libre, cursive",
    fontSize:'120%',
    color:'white'
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: 'rgba(255, 0, 0, 0.5)' }}>
        <Toolbar style={{marginRight:'5%'}}>
          <Typography variant="h4" className={classes.title}
          >
            <a href="/" style={{color:'white',textDecoration:'none'}}>EaseOurशादी</a>
          </Typography>

          <Button
            color="inherit"
            className={classes.button}
            startIcon={<AddBox />}
            href="/new/service/"
            size="x-large"
          >
            Services
          </Button>

          <Button
            color="inherit"
            className={classes.button}
            startIcon={<ShoppingCart />}
            size="x-large"
            href="/list/"
          >
            Shop
          </Button>

          <Auth />
        </Toolbar>
      </AppBar>
    </div>
  );
}
