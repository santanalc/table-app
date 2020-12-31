import { createMuiTheme } from "@material-ui/core";

const white = "#FFFFFF";

const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: white,
      main: "#41436A",
    },
    secondary: {
      contrastText: white,
      main: "#F54768",
    },
  },
});

export default theme;
