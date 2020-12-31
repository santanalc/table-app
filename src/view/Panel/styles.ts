import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "5% 20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  square: {
    backgroundColor: "#974063",
    marginRight: theme.spacing(1),
  },
  rounded: {
    backgroundColor: "#FF9678",
  },
  flex: {
    display: "flex",
  },
}));
