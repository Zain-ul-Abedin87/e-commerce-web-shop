import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    border:"1px solid black" 
  },
}));
