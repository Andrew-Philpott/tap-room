import React from "react";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from "@material-ui/icons/Remove";
import * as role from "../../constants/roles";
import * as route from "../../constants/routes";
import "./index.css";

const BeerItem = ({
  roles,
  beer,
  onDeleteBeer,
  onIncrementBeerPints,
  onDecrementBeerPints,
}) => {
  return (
    <tr key={beer.beerId}>
      <td>
        <Link to={`/beers/details/${beer.beerId}`}>{beer.name}</Link>
        <React.Fragment>
          <br />
          {beer.pints === 0 ? (
            <span className="red-c">Out of stock</span>
          ) : beer.pints <= 10 ? (
            <span className="yellow-c">Almost Empty</span>
          ) : null}
        </React.Fragment>
      </td>
      <td>{beer.brand}</td>
      <td>{beer.flavor}</td>
      <td>{beer.aroma}</td>
      <td>{beer.alcoholContent}</td>
      <td>
        <span
          className={`${
            beer.price > 12
              ? "orange-c"
              : beer.price > 8
              ? "yellow-c"
              : "green-c"
          }`}
        >
          {beer.price}
        </span>
      </td>
      <td>{beer.pints}</td>
      {roles &&
        (roles.indexOf(role.EMPLOYEE) !== -1 ||
          roles.indexOf(role.ADMIN) !== -1) && (
          <React.Fragment>
            <td>
              <RemoveIcon
                className="minus"
                onClick={() =>
                  beer.pints > 0 && onDecrementBeerPints(beer.beerId)
                }
              />
            </td>
            <td>
              <AddIcon
                className="plus"
                onClick={() => onIncrementBeerPints(beer.beerId)}
              />
            </td>
            {roles.indexOf(role.ADMIN) !== -1 && (
              <React.Fragment>
                <td>
                  <Link to={`/beers/edit/${beer.beerId}`}>
                    <EditIcon className="edit" />
                  </Link>
                </td>
                <td>
                  <DeleteIcon
                    className="delete"
                    onClick={() => onDeleteBeer(beer.beerId)}
                  />
                </td>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
    </tr>
  );
};

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
    <div id="beer-list" className="main-content">
      <h1>Beers On Tap</h1>
      {isAuth && (
        <div>
          <Link to={route.NEW_REVIEW}>Write a review</Link>
          {isAdmin && <Link to={route.NEW_BEER}>Add a beer</Link>}
        </div>
      )}
      {beers.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>On Tap</th>
              <th>Brand</th>
              <th>Flavor</th>
              <th>Aroma</th>
              <th>ABV</th>
              <th>Price</th>
              <th>Pints</th>
              {(roles && roles.indexOf(role.EMPLOYEE) !== -1) ||
                (roles.indexOf(role.ADMIN) !== -1 && (
                  <React.Fragment>
                    <th>Buy</th>
                    <th>Restock</th>
                    {roles.indexOf(role.ADMIN) !== -1 && (
                      <React.Fragment>
                        <th>Edit</th>
                        <th>Remove</th>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ))}
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      ) : (
        <h1>Beer list unavailable</h1>
      )}
    </div>
  );
};
