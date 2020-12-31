import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import Panel from "./view/Panel/Panel";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Panel />
    </ThemeProvider>
  );
}

export default App;
