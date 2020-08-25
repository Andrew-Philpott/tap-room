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
import * as role from "../constants/roles";
import * as route from "../constants/routes";
import BeerItem from "../components/BeerItem";

export default ({
  roles,
  beers,
  isAuth,
  isAdmin,
  onDeleteBeer,
  onIncrementBeerPints,
  onDecrementBeerPints,
}) => {
  return (
    <Container className="main-content" maxWidth="lg">
      <Grid container>
        <Grid item xs={9}>
          <h1>Beers On Tap</h1>
        </Grid>
        <Grid item xs={3}>
          <Grid justify="flex-end" container>
            {isAuth && (
              <Button component={Link} className="button" to={route.NEW_REVIEW}>
                Write a review
              </Button>
            )}
            {isAdmin && (
              <Button component={Link} className="button" to={route.NEW_BEER}>
                Add a beer
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {beers.length !== 0 ? (
            <TableContainer>
              <Table className="beer-list-table" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">On Tap</TableCell>
                    <TableCell align="left">Brand</TableCell>
                    <TableCell align="left">Flavor</TableCell>
                    <TableCell align="left">Aroma</TableCell>
                    <TableCell align="left">ABV</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Pints</TableCell>
                    {(roles && roles.indexOf(role.EMPLOYEE) !== -1) ||
                      (roles.indexOf(role.ADMIN) !== -1 && (
                        <React.Fragment>
                          <TableCell align="center">Buy</TableCell>
                          <TableCell align="center">Restock</TableCell>
                          {roles.indexOf(role.ADMIN) !== -1 && (
                            <React.Fragment>
                              <TableCell align="center">Edit</TableCell>
                              <TableCell align="center">Remove</TableCell>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {beers.map((beer, index) => (
                    <BeerItem
                      key={index}
                      beer={beer}
                      roles={roles}
                      onIncrementBeerPints={onIncrementBeerPints}
                      onDecrementBeerPints={onDecrementBeerPints}
                      onDeleteBeer={onDeleteBeer}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h1>Beer list unavailable</h1>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
