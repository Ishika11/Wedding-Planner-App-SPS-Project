import React from "react";
import Auth from "../auth/Auth.js";
import { useStyles } from "./NavbarStyles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import AddBox from "@material-ui/icons/AddBox";

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            EaseOurशादी
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
