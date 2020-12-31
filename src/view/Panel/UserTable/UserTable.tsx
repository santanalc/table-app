import React, { useEffect, useState } from "react";
import { Visibility, Search } from "@material-ui/icons";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Toolbar,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import { useStyles } from "./styles";
import UserModal, { User } from "../../UserModal/UserModal";
import moment from "moment";
import "moment/locale/pt-br";

export interface Data {
  name: string;
  gender: string;
  birth: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => any) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, any]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  alignLeft: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "name",
    alignLeft: true,
    disablePadding: true,
    label: "Nome",
  },
  { id: "gender", alignLeft: false, disablePadding: false, label: "Sexo" },
  {
    id: "birth",
    alignLeft: false,
    disablePadding: false,
    label: "Data de nascimento",
  },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignLeft ? "left" : "right"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="right">Ações</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default function UserTable() {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userModal, setUserModal] = useState<any>({ open: false, user: {} });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");

  // const [buttonSearch, setButtonSearch] = useState(false);
  const nationalities = [
    { cod: "au", name: "Austrália" },
    { cod: "br", name: "Brasil" },
    { cod: "ca", name: "Canadá" },
    { cod: "ch", name: "Suiça" },
    { cod: "de", name: "Alemanha" },
    { cod: "dk", name: "Dinamarca" },
    { cod: "es", name: "Espanha" },
    { cod: "fi", name: "Finlândia" },
    { cod: "fr", name: "França" },
    { cod: "gb", name: "Reino Unido" },
    { cod: "ie", name: "República da Irlanda" },
    { cod: "ir", name: "Irã" },
    { cod: "nl", name: "Holanda" },
    { cod: "nz", name: "Nova Zelândia" },
    { cod: "tr", name: "Turquia" },
    { cod: "us", name: "EUA" },
  ];

  moment.locale("pt-br");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  function createUserList(users: any) {
    const newUsers = users
      .map((elem: any) => {
        return {
          image: elem.picture.medium,
          name: `${elem.name.first} ${elem.name.last}`,
          email: elem.email,
          gender: elem.gender,
          birth: elem.dob.date,
          phone: elem.cell,
          nationality: elem.location.country,
          address: `${elem.location.city} ${elem.location.street.name} ${elem.location.street.number}`,
          id: elem.id.name,
        };
      })
      .filter((user: User) => user.name.includes(search));

    return newUsers;
  }

  useEffect(() => {
    if (filter !== "0") setSearch("");
  }, [filter]);

  async function searchFilter() {
    setLoading(true);
    let parameter;

    if (filter === "") {
      parameter = ``;
    }

    if (filter === "0") {
      parameter = `nat=${nationality}`;
    }

    if (filter === "1") {
      parameter = `gender=${gender}&nat=${nationality}`;
    }

    try {
      let response = await fetch(
        `https://randomuser.me/api/?results=50&${parameter}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let responseObject = await response.json();
      setPage(0);
      setRows(createUserList(responseObject.results));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(`https://randomuser.me/api/?results=50`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let responseObject = await response.json();

        setRows(createUserList(responseObject.results));
        setPage(0);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar>
          <Grid container spacing={2} className={classes.filterContainer}>
            <Grid item md={3}>
              <FormControl variant="outlined" className={classes.select}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Filtrar
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  fullWidth
                  label="Filtrar"
                >
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                  <MenuItem value={"0"}>Nome</MenuItem>
                  <MenuItem value={"1"}>Sexo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              {filter === "0" ? (
                <TextField
                  id="input-with-icon-textfield"
                  label="Pesquisar"
                  fullWidth
                  variant="outlined"
                  value={search}
                  onChange={(e) => setSearch(e.target.value as any)}
                />
              ) : filter === "1" ? (
                <FormControl variant="outlined" className={classes.select}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    fullWidth
                  >
                    <MenuItem value={"male"}>Masculino</MenuItem>
                    <MenuItem value={"female"}>Feminino</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <div></div>
              )}
            </Grid>
            <Grid item md={3}>
              {filter !== "" && (
                <FormControl variant="outlined" className={classes.select}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value as any)}
                    fullWidth
                  >
                    {nationalities.map((elem) => {
                      return <MenuItem value={elem.cod}>{elem.name}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item md={2} className={classes.buttonContainer}>
              <Button
                color={"secondary"}
                variant="contained"
                onClick={() => searchFilter()}
              >
                <Search style={{ marginRight: "5px" }} />
                Buscar
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {!loading
                ? stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.name}
                        >
                          <TableCell component="th" id={labelId} scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">
                            {row.gender === "female" ? "Feminino" : "Masculino"}
                          </TableCell>
                          <TableCell align="right">
                            {moment(row.birth).format("ll")}
                          </TableCell>

                          <TableCell align="right">
                            <Button
                              aria-label="edit"
                              onClick={() => {
                                setUserModal({ open: true, user: row });
                              }}
                            >
                              <Visibility />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                : Array(10)
                    .fill(0)
                    .map((elem) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1}>
                          <TableCell>
                            <LinearProgress />
                          </TableCell>
                          <TableCell>
                            <LinearProgress />
                          </TableCell>
                          <TableCell>
                            <LinearProgress />
                          </TableCell>
                          <TableCell>
                            <LinearProgress />
                          </TableCell>
                        </TableRow>
                      );
                    })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <UserModal
          open={userModal.open}
          handleClose={() => setUserModal({ open: false, user: {} })}
          user={userModal.user}
        />
      </Paper>
    </div>
  );
}
