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
  const { user } = props;
  const classes = useStyles();
  const [beers, setBeers] = useState(null);
  const [apiErrors, setApiErrors] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (!beers) {
      beerService
        .getBeers()
        .then((response) => {
          if (mounted) {
            setBeers(response)
          }
        })
        .catch(() =>
          setApiErrors(
            "Something went wrong trying to fetch the list beers. Please try again later."
          )
        );
    }
    return () => mounted = false;
  }, [beers]);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this beer?"))
      beerService
        .deleteBeer(id)
        .then(() => {
          let newState = { ...beers };
          newState = newState.filter((x) => x.beerId !== id);
          setBeers(newState);
        })
        .catch(() =>
          setApiErrors("Something went wrong while trying to delete the beer.")
        );
  };

  const incrementPints = (id) => {
    beerService
      .incrementPints(id)
      .then((beer) => {
        const newState = beers.map((x) => (x.beerId === id ? beer : x));
        setBeers(newState);
      })
      .catch(() =>
        setApiErrors(
          "Something went wrong while trying to increment the number of pints."
        )
      );
  };

  const decrementPints = (id) => {
    beerService
      .decrementPints(id)
      .then((beer) => {
        const newState = beers.map((x) => (x.beerId === id ? beer : x));
        setBeers(newState);
      })
      .catch(() =>
        setApiErrors(
          "Something went wrong while trying to decrement the number of pints."
        )
      );
  };

  return (
    <Container maxWidth="md">
      {apiErrors && <h1>{apiErrors}</h1>}
      <Grid className={classes.marginTopTwo} container>
        <Grid item xs={8}>
          <p className="white-text-large">Beer... Delicious beer.</p>
        </Grid>
        <Grid item xs={4}>
          {user && user.role === role.ADMIN && (
            <Button
              component={Link}
              className={`${classes.buttons} ${classes.floatRight}`}
              to={route.NEW_BEER}
            >
              Add beer
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell scope="row">
                    On Tap
                    </TableCell>
                  <TableCell align="left">Brand</TableCell>
                  <TableCell align="left">Flavor</TableCell>
                  <TableCell align="left">ABV</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Pints</TableCell>
                  {user &&
                    (user.role === role.EMPLOYEE ||
                      user.role === role.ADMIN) &&
                    <React.Fragment>
                      <TableCell align="left">Buy</TableCell>
                      <TableCell align="left">Restock</TableCell>
                      {user.role === role.ADMIN && <React.Fragment><TableCell align="left">Edit</TableCell>
                        <TableCell align="left">Remove</TableCell></React.Fragment>}
                    </React.Fragment>
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {beers &&
                  beers.map((beer) => (
                    <TableRow key={beer.beerId} className={classes.tableRow}>
                      <TableCell>
                        <Link
                          style={{
                            color: "white",
                          }}
                          to={`/beers/${parseInt(beer.beerId)}`}
                        >
                          {beer.name}
                        </Link>
                        {beer.pints === 0 ? (
                          <p>
                            {" "}
                            <i
                              className={`${classes.red} ${classes.marginTopTwo}`}
                            >
                              Out of stock
                        </i>
                          </p>
                        ) : beer.pints <= 10 &&
                          <p>
                            <i
                              className={`${classes.yellow} ${classes.marginTopTwo}`}
                            >
                              Almost Empty
                              </i>
                          </p>
                        }
                      </TableCell>
                      <TableCell align="left">{beer.brand}</TableCell>
                      <TableCell align="left">{beer.flavor}</TableCell>
                      <TableCell align="left">
                        {beer.alcoholContent}
                      </TableCell>
                      {beer.price > 12 ? (
                        <TableCell align="left">
                          <span className="orange" >{beer.price}</span>
                        </TableCell>
                      ) : beer.price > 8 ? (
                        <TableCell align="left">
                          <span className="yellow">{beer.price}</span>
                        </TableCell>
                      ) : (
                            <TableCell align="left">
                              <span className="green">{beer.price}</span>
                            </TableCell>
                          )}
                      <TableCell align="left">{beer.pints}</TableCell>
                      {user &&
                        (user.role === role.EMPLOYEE ||
                          user.role === role.ADMIN) &&
                        <React.Fragment>
                          {beer.pints > 0 ? (
                            <TableCell align="center">
                              <span
                                onClick={() => decrementPints(beer.beerId)}
                                className={classes.actionLinkStyle}
                              >
                                -
                              </span>
                            </TableCell>
                          ) : (
                              <TableCell align="center">
                                <span className={classes.actionLinkStyle}>
                                  -
                                </span>
                              </TableCell>
                            )}
                          <TableCell align="center">
                            <span
                              className={classes.actionLinkStyle}
                              onClick={() => incrementPints(beer.beerId)}
                            >
                              +
                              </span>
                          </TableCell>
                          {user.role === role.ADMIN && <React.Fragment><TableCell align="center">
                            <Link to={`/beers/edit/${beer.beerId}`}>
                              <EditIcon
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                              />
                            </Link>
                          </TableCell>
                            <TableCell align="center">
                              <span
                                className={classes.actionLinkStyle}
                                onClick={() => onDelete(beer.beerId)}
                              >
                                X
                              </span>
                            </TableCell></React.Fragment>}

                        </React.Fragment>
                      }
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
