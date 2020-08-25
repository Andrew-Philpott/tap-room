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
import * as role from "../../constants/roles";
import * as route from "../../constants/routes";
import BeerItem from "./BeerItem";

export default ({ ...props }) => {
  const {
    user,
    beers,
    onDeleteBeer,
    onIncrementBeerPints,
    onDecrementBeerPints,
  } = props;
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
        {beers.length !== 0 && (
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
                  {beers.map((beer, index) => (
                    <BeerItem
                      key={index}
                      user={user}
                      beer={beer}
                      onIncrementBeerPints={onIncrementBeerPints}
                      onDecrementBeerPints={onDecrementBeerPints}
                      onDeleteBeer={onDeleteBeer}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
