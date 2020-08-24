export const useStyles = (theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    fontFamily: "Open Sans",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    marginLeft: theme.spacing(1),
    color:'white',
    fontFamily: "Averia Sans Libre, cursive",
  },
  logout_button:{
    marginLeft: theme.spacing(1),
    backgroundColor:'rgba(255, 0, 0, 0.5)',
    fontFamily: "Averia Sans Libre, cursive",
  },
});
