import React, { Component } from "react";
import TwitterLogin from "react-twitter-auth";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ExitToApp from "@material-ui/icons/ExitToApp";
import VpnKey from "@material-ui/icons/VpnKey";

import { useStyles } from "./AuthStyles";
var config = require("./config.js");

class Auth extends Component {
  constructor() {
    super();
    var defaultState = {
      isAuthenticated: false,
      user: null,
      token: "",
      open: false,
    };
    this.state = JSON.parse(localStorage.getItem("authState")) || defaultState;
    this.setLocalState();
  }

  setLocalState = () => {
    localStorage.setItem("authState", JSON.stringify(this.state));
  };

  logout = () => {
    this.setState(
      { isAuthenticated: false, token: "", user: null, open: false },
      this.setLocalState
    );
  };

  onFailure = (error) => {
    alert(error);
  };

  twitterResponse = (response) => {
    const token = response.headers.get("x-auth-token");
    response.json().then((user) => {
      if (token) {
        this.setState(
          { isAuthenticated: true, user, token, open: false },
          this.setLocalState
        );
      }
    });
  };

  facebookResponse = (response) => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default",
    };
    fetch("http://localhost:4000/api/v1/auth/facebook", options).then((r) => {
      const token = r.headers.get("x-auth-token");
      r.json().then((user) => {
        if (token) {
          this.setState(
            { isAuthenticated: true, user, token, open: false },
            this.setLocalState
          );
        }
      });
    });
  };

  googleResponse = (response) => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default",
    };
    fetch("http://localhost:4000/api/v1/auth/google", options).then((r) => {
      const token = r.headers.get("x-auth-token");
      r.json().then((user) => {
        if (token) {
          this.setState(
            { isAuthenticated: true, user, token, open: false },
            this.setLocalState
          );
        }
      });
    });
  };

  setOpen = (val) => {
    this.setState({ open: val }, this.setLocalState);
  };

  handleOpen = () => {
    this.setOpen(true);
  };

  handleClose = () => {
    this.setOpen(false);
  };

  render() {
    const { classes } = this.props;
    const buttonSize = {
      display: "block",
      width: "100%",
      height: "100%",
      marginTop: "10px",
    };
    let content = !!this.state.isAuthenticated ? (
      <div className={classes.root}>
        <Avatar alt={this.state.user.fullName} src={this.state.user.picture} />
        <p className={[classes.modal, classes.button].join(' ')}>{this.state.user.fullName}</p>
        <Button
          color="secondary"
          variant="contained"
          size="x-large"
          className={classes.button}
          startIcon={<ExitToApp />}
          onClick={this.logout}
        >
          Log out
        </Button>
      </div>
    ) : (
      <div className={classes.root}>
        <Button
          color="inherit"
          size="x-large"
          className={classes.button}
          startIcon={<VpnKey />}
          onClick={this.handleOpen}
        >
          Sign In
        </Button>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.open}>
            <div className={classes.paper}>
              <h2 style={{ fontFamily: "Open Sans" }}>Sign In</h2>
              <div style={{ textAlign: "center" }}>
                <TwitterLogin
                  style={buttonSize}
                  loginUrl="http://localhost:4000/api/v1/auth/twitter"
                  onFailure={this.onFailure}
                  onSuccess={this.twitterResponse}
                  requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
                  showIcon={true}
                ></TwitterLogin>
                <br></br>
                <div>
                  <FacebookLogin
                    style={buttonSize}
                    appId={config.FACEBOOK_APP_ID}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.facebookResponse}
                  />
                </div>
                <br></br>
                <GoogleLogin
                  style={buttonSize}
                  clientId={config.GOOGLE_CLIENT_ID}
                  buttonText="Sign in with Google"
                  onSuccess={this.googleResponse}
                  onFailure={this.onFailure}
                />
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );

    return <div className="App">{content}</div>;
  }
}

export default withStyles(useStyles)(Auth);
