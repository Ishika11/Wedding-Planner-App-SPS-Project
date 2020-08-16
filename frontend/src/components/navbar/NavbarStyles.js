import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

export const useStyles = makeStyles((theme) => ({
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
  },
}));
