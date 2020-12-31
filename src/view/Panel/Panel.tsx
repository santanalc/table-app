import { AppBar, Avatar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import UserTable from "./UserTable/UserTable";

export default function Panel() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.topBar}>
          <div className={classes.flex}>
            <Avatar className={classes.square} variant="square">
              C
            </Avatar>
            <Typography variant="h5">Companhia</Typography>
          </div>
          <Avatar className={classes.rounded}>L</Avatar>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Typography variant="subtitle1" gutterBottom>
          Tabela de usuário, podendo filtrar por nome, sexo e nacionalidade.
        </Typography>

        <UserTable />
      </div>
    </div>
  );
}
