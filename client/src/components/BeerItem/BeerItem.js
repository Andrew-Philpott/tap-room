import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import * as role from "../../constants/roles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from "@material-ui/icons/Remove";
import "./index.css";

export default ({
  roles,
  beer,
  onDeleteBeer,
  onIncrementBeerPints,
  onDecrementBeerPints,
}) => {
  return (
    <TableRow key={beer.beerId}>
      <TableCell>
        <Link to={`/beers/details/${beer.beerId}`}>{beer.name}</Link>
        <React.Fragment>
          <br />
          {beer.pints === 0 ? (
            <span className="red-c">Out of stock</span>
          ) : beer.pints <= 10 ? (
            <span className="yellow-c">Almost Empty</span>
          ) : null}
        </React.Fragment>
      </TableCell>
      <TableCell align="left">
        <span className="beer-item">{beer.brand}</span>
      </TableCell>
      <TableCell align="left">
        <span className="beer-item">{beer.flavor}</span>
      </TableCell>
      <TableCell align="left">
        <span className="beer-item">{beer.aroma}</span>
      </TableCell>
      <TableCell align="left">
        <span className="beer-item">{beer.alcoholContent}</span>
      </TableCell>
      <TableCell align="left">
        <span
          className={`beer-item ${
            beer.price > 12
              ? "orange-c"
              : beer.price > 8
              ? "yellow-c"
              : "green-c"
          }`}
        >
          {beer.price}
        </span>
      </TableCell>
      <TableCell align="left">
        <span className="beer-item">{beer.pints}</span>
      </TableCell>
      {roles &&
        (roles.indexOf(role.EMPLOYEE) !== -1 ||
          roles.indexOf(role.ADMIN) !== -1) && (
          <React.Fragment>
            <TableCell align="center">
              <RemoveIcon
                className="beer-item minus"
                onClick={() =>
                  beer.pints > 0 && onDecrementBeerPints(beer.beerId)
                }
              />
            </TableCell>
            <TableCell align="center">
              <AddIcon
                className="beer-item plus"
                onClick={() => onIncrementBeerPints(beer.beerId)}
              />
            </TableCell>
            {roles.indexOf(role.ADMIN) !== -1 && (
              <React.Fragment>
                <TableCell align="center">
                  <Link to={`/beers/edit/${beer.beerId}`}>
                    <EditIcon className="beer-item edit" />
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    className="beer-item delete"
                    onClick={() => onDeleteBeer(beer.beerId)}
                  />
                </TableCell>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
    </TableRow>
  );
};
