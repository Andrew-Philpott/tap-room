import React from "react";
import { Link } from "react-router-dom";
import Plus from "../assets/plus.svg";
import Minus from "../assets/minus.svg";
import Trash from "../assets/trash.svg";
import Pencil from "../assets/pencil-alt.svg";
import {
  incrementPints,
  decrementPints,
  deleteBeer,
} from "../other/beer-service";
import * as role from "../other/roles";
import * as route from "../other/routes";

const BeerItem = ({
  roles,
  beer,
  onDeleteBeer,
  onIncrementBeerPints,
  onDecrementBeerPints,
}) => {
  return (
    <tr key={beer.beerId} data-test="component-beer-item">
      <td>
        <Link to={`/beers/details/${beer.beerId}`}>{beer.name}</Link>
        <React.Fragment>
          <br />
          {beer.pints === 0 ? (
            <span className="red">Out of stock</span>
          ) : beer.pints <= 10 ? (
            <span className="yellow">Almost Empty</span>
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
              ? "orange"
              : beer.price > 8
              ? "yellow"
              : "green"
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
              <Minus
                className="minus"
                onClick={() =>
                  beer.pints > 0 && onDecrementBeerPints(beer.beerId)
                }
              />
            </td>
            <td>
              <Plus
                className="plus"
                onClick={() => onIncrementBeerPints(beer.beerId)}
              />
            </td>
            {roles.indexOf(role.ADMIN) !== -1 && (
              <React.Fragment>
                <td>
                  <Link to={`/beers/edit/${beer.beerId}`}>
                    <Pencil className="edit" />
                  </Link>
                </td>
                <td>
                  <Trash
                    onClick={() => onDeleteBeer(beer.beerId)}
                    className="delete"
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
  getToken,
  setBeers,
  setError,
}) => {
  const handleDeleteBeer = (id) => {
    if (window.confirm("Are you sure you want to delete this beer?")) {
      deleteBeer(getToken(), id)
        .then((beer) => {
          setBeers([...beers.filter((x) => x.beerId !== beer.beerId)]);
        })
        .catch(setError);
    }
  };

  const handleIncrementBeerPints = (id) => {
    incrementPints(getToken(), id)
      .then((res) => {
        setBeers([...beers.map((x) => (x.beerId === res.beerId ? res : x))]);
      })
      .catch(setError);
  };

  const handleDecrementBeerPints = (id) => {
    decrementPints(getToken(), id)
      .then((res) => {
        setBeers([...beers.map((x) => (x.beerId === res.beerId ? res : x))]);
      })
      .catch(setError);
  };

  return (
    <div id="beer-list" className="main-content" data-test="component-beer-list">
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
              {roles && (roles.indexOf(role.EMPLOYEE) !== -1 ||
                roles.indexOf(role.ADMIN) !== -1) && (
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
                )}
            </tr>
          </thead>
          <tbody>
            {beers.map((beer, index) => (
              <BeerItem
                key={index}
                beer={beer}
                roles={roles}
                onIncrementBeerPints={handleIncrementBeerPints}
                onDecrementBeerPints={handleDecrementBeerPints}
                onDeleteBeer={handleDeleteBeer}
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
