import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  card: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    "&:focus": {
      outline: "none",
    },
    width: "700px",
    height: "330px",
  },
  paper: {
    position: "absolute",
    height: "50px",
    width: "100%",
    backgroundColor: "#F54768",
  },
  paperBottom: {
    position: "absolute",
    bottom: "0",
    height: "30px",
    width: "100%",
    backgroundColor: "#41436A",
  },
  squad: {
    position: "absolute",
    height: "100px",
    width: "100px",
    transform: "rotate(45deg)",
    backgroundColor: "#F54768",
  },
  avatar: { width: "70px", height: "70px", marginTop: theme.spacing(2) },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  info: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: "20px",
    width: "100%",
    margin: theme.spacing(1),
  },
  title: {
    fontWeight: "bold",
    marginRight: theme.spacing(1),
  },
  flex: {
    display: "flex",
  },
}));
