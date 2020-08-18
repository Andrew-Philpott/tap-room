import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import beerActions from "../../actions/beer-actions";
import * as role from "../../constants/roles";
import * as route from "../../constants/routes";

export default () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const beers = useSelector((state) => state.beers.items);

  React.useEffect(() => {
    if (!beers) {
      dispatch(beerActions.getBeers());
    }
  }, [beers]);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this beer?"))
      dispatch(beerActions.deleteBeer(id));
  };

  const incrementPints = (id) => {
    dispatch(beerActions.incrementPints(id));
  };

  const decrementPints = (id) => {
    dispatch(beerActions.decrementPints(id));
  };
  console.log(beers);
  return (
    <Container maxWidth="md">
      <Grid className="mrgn-t16" container>
        <Grid item xs={8}>
          <h1 className="white-text">Beer... Delicious beer.</h1>
        </Grid>
        <Grid item xs={4}>
          {user && user.role === role.ADMIN && (
            <Button
              component={Link}
              className="buttons float-right"
              to={route.NEW_BEER}
            >
              Add beer
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table className="beer-list-table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">On Tap</TableCell>
                  <TableCell align="left">Brand</TableCell>
                  <TableCell align="left">Flavor</TableCell>
                  <TableCell align="left">ABV</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Pints</TableCell>
                  {user &&
                    (user.role === role.EMPLOYEE ||
                      user.role === role.ADMIN) && (
                      <React.Fragment>
                        <TableCell align="left">Buy</TableCell>
                        <TableCell align="left">Restock</TableCell>
                        {user.role === role.ADMIN && (
                          <React.Fragment>
                            <TableCell align="left">Edit</TableCell>
                            <TableCell align="left">Remove</TableCell>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    )}
                </TableRow>
              </TableHead>
              <TableBody>
                {beers &&
                  beers.map((beer) => (
                    <TableRow key={beer.beerId}>
                      <TableCell>
                        <span>
                          <Link to={`/beers/${parseInt(beer.beerId)}`}>
                            <i>
                              <u>{beer.name}</u>
                            </i>
                          </Link>
                          {beer.pints === 0 ? (
                            <i className="red">
                              &nbsp;&nbsp;&nbsp;Out of stock
                            </i>
                          ) : (
                            beer.pints <= 10 && (
                              <i className="yellow">
                                &nbsp;&nbsp;&nbsp;Almost Empty
                              </i>
                            )
                          )}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span>{beer.brand}</span>
                      </TableCell>
                      <TableCell align="left">
                        <span>{beer.flavor}</span>
                      </TableCell>
                      <TableCell align="left">
                        <span>{beer.alcoholContent}</span>
                      </TableCell>
                      {beer.price > 12 ? (
                        <TableCell align="left">
                          <span className="orange">{beer.price}</span>
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
                          user.role === role.ADMIN) && (
                          <React.Fragment>
                            {beer.pints > 0 ? (
                              <TableCell align="center">
                                <span
                                  onClick={() => decrementPints(beer.beerId)}
                                  className="action-link"
                                >
                                  -
                                </span>
                              </TableCell>
                            ) : (
                              <TableCell align="center">
                                <span className="action-link">-</span>
                              </TableCell>
                            )}
                            <TableCell align="center">
                              <span
                                className="action-link"
                                onClick={() => incrementPints(beer.beerId)}
                              >
                                +
                              </span>
                            </TableCell>
                            {user.role === role.ADMIN && (
                              <React.Fragment>
                                <TableCell align="center">
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
                                    className="action-link"
                                    onClick={() => onDelete(beer.beerId)}
                                  >
                                    X
                                  </span>
                                </TableCell>
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        )}
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
