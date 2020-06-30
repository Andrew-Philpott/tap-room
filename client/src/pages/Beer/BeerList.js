import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Grid, Container, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { beerService } from "../../services/beer-service";
import * as role from "../../constants/roles";
import * as route from "../../constants/routes";
import { useStyles } from "../../components/use-styles";

export const BeerList = (props) => {
  const [beers, setBeers] = useState(null);
  const [errors, setErrors] = useState(null);
  const { user } = props;

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this beer?"))
      beerService.deleteBeer(id);
  };
  useEffect(() => {
    beerService.getBeers().then((res) => setBeers(res));
  }, []);

  const incrementPints = (id) => {
    setErrors(null);
    beerService
      .incrementPints(id)
      .then((beer) => {
        const newState = beers.map((x) => (x.id === id ? beer : x));
        setBeers(newState);
      })
      .catch((error) => {
        let temp = { ...errors };
        temp.internal = error;
        setErrors({ ...temp });
      });
  };

  const decrementPints = (id) => {
    setErrors(null);
    beerService
      .decrementPints(id)
      .then((beer) => {
        const newState = beers.map((x) => (x.id === id ? beer : x));
        setBeers(newState);
      })
      .catch((error) => {
        let temp = { ...errors };
        temp.internal = error;
        setErrors({ ...temp });
      });
  };

  const classes = useStyles();
  return (
    <Container>
      <Grid container>
        <Grid item xs={8}>
          <br></br>
          <span style={{ color: "white", fontSize: "2em" }}>
            Beer... Delicious beer.
          </span>
          <br></br>
        </Grid>
        <Grid item xs={4}>
          {user && user.role === role.ADMIN ? (
            <Button
              style={{
                backgroundColor: "white",
                float: "right",
                marginTop: "10px",
              }}
              href={route.NEW_BEER}
            >
              Add beer
            </Button>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className={classes.tableCell}
                    component="th"
                    scope="row"
                  >
                    On Tap
                  </TableCell>
                  <TableCell className={classes.tableCell} align="left">
                    Brand
                  </TableCell>
                  <TableCell className={classes.tableCell} align="left">
                    Flavor
                  </TableCell>
                  <TableCell className={classes.tableCell} align="left">
                    ABV
                  </TableCell>
                  <TableCell className={classes.tableCell} align="left">
                    Price
                  </TableCell>
                  <TableCell className={classes.tableCell} align="left">
                    Pints
                  </TableCell>
                  {user &&
                  (user.role === role.EMPLOYEE || user.role === role.ADMIN) ? (
                    <>
                      <TableCell className={classes.tableCell} align="left">
                        Buy
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        Restock
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        Edit
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        Remove
                      </TableCell>
                    </>
                  ) : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {beers &&
                  beers.map((beer) => (
                    <TableRow key={beer.id}>
                      <TableCell className={classes.tableCell}>
                        <Link
                          to={`/beers/${beer.id}`}
                          className={classes.actionLinkStyle}
                        >
                          {beer.name}
                          {beer.pints > 10 ? (
                            ""
                          ) : beer.pints > 0 ? (
                            <>
                              <br />
                              <i className={classes.yellow}>Almost Empty</i>
                            </>
                          ) : (
                            <>
                              <br />
                              <i className={classes.red}>Out of stock</i>
                            </>
                          )}
                        </Link>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {beer.brand}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {beer.flavor}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {beer.alcoholContent}
                      </TableCell>
                      {beer.price > 12 ? (
                        <TableCell
                          style={{ color: "orange", borderBottom: "none" }}
                          align="left"
                        >
                          {beer.price}
                        </TableCell>
                      ) : beer.price > 8 ? (
                        <TableCell
                          style={{ color: "yellow", borderBottom: "none" }}
                          align="left"
                        >
                          {beer.price}
                        </TableCell>
                      ) : (
                        <TableCell
                          style={{ color: "green", borderBottom: "none" }}
                          align="left"
                        >
                          {beer.price}
                        </TableCell>
                      )}
                      <TableCell className={classes.tableCell} align="left">
                        {beer.pints}
                      </TableCell>

                      {user &&
                      (user.role === role.EMPLOYEE ||
                        user.role === role.ADMIN) ? (
                        <>
                          {beer.pints > 0 ? (
                            <TableCell
                              className={classes.tableCell}
                              align="center"
                            >
                              <span
                                onClick={() => decrementPints(beer.id)}
                                className={classes.actionLinkStyle}
                              >
                                -
                              </span>
                            </TableCell>
                          ) : (
                            <TableCell
                              className={classes.tableCell}
                              align="center"
                            >
                              <span className={classes.actionLinkStyle}>-</span>
                            </TableCell>
                          )}

                          <TableCell
                            className={classes.tableCell}
                            align="center"
                          >
                            <span
                              className={classes.actionLinkStyle}
                              onClick={() => incrementPints(beer.id)}
                            >
                              +
                            </span>
                          </TableCell>
                          <TableCell
                            className={classes.tableCell}
                            align="center"
                          >
                            <Link to={`/beers/edit/${beer.id}`}>
                              <EditIcon
                                style={{
                                  cursor: "pointer",
                                }}
                              ></EditIcon>
                            </Link>
                          </TableCell>
                          <TableCell
                            style={{
                              borderBottom: "none",
                            }}
                            align="center"
                          >
                            <span
                              className={classes.actionLinkStyle}
                              onClick={() => onDelete(beer.id)}
                            >
                              X
                            </span>
                          </TableCell>
                        </>
                      ) : null}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BeerList;
