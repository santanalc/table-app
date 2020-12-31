import React from "react";
import {
  Modal,
  Card,
  Avatar,
  CardContent,
  Backdrop,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles";
import moment from "moment";

export interface User {
  image: string;
  name: string;
  email: string;
  gender: string;
  birth: string;
  phone: string;
  nationality: string;
  address: string;
  id: string;
}
interface Props {
  open: boolean;
  handleClose: () => any;
  user: User;
}

export default function UserModal(props: Props) {
  const classes = useStyles();

  const { user } = props;

  return (
    <Modal
      open={props.open}
      className={classes.modal}
      onClose={props.handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Card className={classes.card}>
        <div className={classes.paper} />
        <div className={classes.squad} />
        <div className={classes.paperBottom} />
        <Avatar
          aria-label="recipe"
          className={classes.avatar}
          src={user.image}
        ></Avatar>
        <CardContent className={classes.cardContent}>
          <div className={classes.info}>
            <div className={classes.flex}>
              <Typography className={classes.title}>Nome:</Typography>
              <Typography>{user.name}</Typography>
            </div>
            <div className={classes.flex}>
              <Typography className={classes.title}>ID:</Typography>
              <Typography>{user.id}</Typography>
            </div>
          </div>
          <div className={classes.info}>
            <div className={classes.flex}>
              <Typography className={classes.title}>Sexo:</Typography>
              <Typography>
                {user.gender === "male" ? "Masculino" : "Feminino"}
              </Typography>
            </div>
            <div className={classes.flex}>
              <Typography className={classes.title}>Email:</Typography>
              <Typography>{user.email}</Typography>
            </div>
          </div>
          <div className={classes.info}>
            <div className={classes.flex}>
              <Typography className={classes.title}>
                Data de nascimento:
              </Typography>
              <Typography>{moment(user.birth).format("ll")}</Typography>
            </div>
            <div className={classes.flex}>
              <Typography className={classes.title}>Telefone:</Typography>
              <Typography>{user.phone}</Typography>
            </div>
          </div>
          <div className={classes.info}>
            <div className={classes.flex}>
              <Typography className={classes.title}>Nacionalidade:</Typography>
              <Typography>{user.nationality}</Typography>
            </div>
            <div className={classes.flex}>
              <Typography className={classes.title}>Endereço:</Typography>
              <Typography>{user.address}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
}
