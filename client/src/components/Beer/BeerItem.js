import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import * as role from "../../constants/roles";

export default ({ ...props }) => {
  const { user, beer, onDelete, onIncrementPints, onDecrementPints } = props;
  return (
    <TableRow key={beer.beerId}>
      <TableCell>
        <span>
          <Link to={`/beers/${parseInt(beer.beerId)}`}>
            <i>
              <u>{beer.name}</u>
            </i>
          </Link>
          {beer.pints === 0 ? (
            <i className="red">&nbsp;&nbsp;&nbsp;Out of stock</i>
          ) : (
            beer.pints <= 10 && (
              <i className="yellow">&nbsp;&nbsp;&nbsp;Almost Empty</i>
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
      {user && (user.role === role.EMPLOYEE || user.role === role.ADMIN) && (
        <React.Fragment>
          {beer.pints > 0 ? (
            <TableCell align="center">
              <span
                onClick={() => onDecrementPints(beer.beerId)}
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
              onClick={() => onIncrementPints(beer.beerId)}
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
  );
};
