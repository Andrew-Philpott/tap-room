import React from "react";
import { Link, useHistory } from "react-router-dom";
import Plus from "../assets/plus.svg";
import Minus from "../assets/minus.svg";
import Trash from "../assets/trash.svg";
import Pencil from "../assets/pencil-alt.svg";
import * as role from "../other/roles";
import * as route from "../other/routes";
import AuthContext from "../components/AuthContext";
import PropTypes from "prop-types";

const BeerItem = ({
  roles,
  beer,
  onDeleteBeer,
  onChangeBeerPints
}) => {
  const history = useHistory();
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
              <img
                alt=""
                height="20"
                width="20"
                src={Minus}
                className="pointer"
                onClick={() =>
                  beer.pints > 0 && onChangeBeerPints(true, beer.beerId)
                }
              />
            </td>
            <td>
              <img
                alt=""
                height="20"
                width="20"
                src={Plus}
                className="pointer"
                onClick={() => onChangeBeerPints(false, beer.beerId)}
              />
            </td>
            {roles.indexOf(role.ADMIN) !== -1 && (
              <React.Fragment>
                <td>
                  <img
                    alt=""
                    height="20"
                    width="20"
                    onClick={() => history.push(`/beers/edit/${beer.beerId}`)}
                    src={Pencil}
                    className="pointer"
                  />
                </td>
                <td>
                  <img
                    alt=""
                    height="20"
                    width="20"
                    src={Trash}
                    onClick={() => onDeleteBeer(beer.beerId)}
                    className="pointer"
                  />
                </td>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
    </tr>
  );
};

const BeerList = ({
  beers,
  setBeers,
  setError,
}) => {
  const { isAuth, isAdmin, roles, getToken } = AuthContext.useAuth();
  const handleDeleteBeer = async (id) => {
    if (window.confirm("Are you sure you want to delete this beer?")) {
      const { deleteBeer } = await import("../other/beer-service");
      deleteBeer(getToken(), id)
        .then((beer) => {
          setBeers([...beers.filter((x) => x.beerId !== beer.beerId)]);
        })
        .catch(setError);
    }
  };

  const handleChangeBeerPints = async (isMinus, id) => {
    const { decrementPints, incrementPints } = await import("../other/beer-service");
    getToken()
      .then((token) => {
        return isMinus ? decrementPints(token, id) : incrementPints(token);
      })
      .then((result) => {
        setBeers([
          ...beers.map((x) => (x.beerId === result.beerId ? result : x)),
        ]);
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
                onChangeBeerPints={handleChangeBeerPints}
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

BeerList.propTypes = {
  beers: PropTypes.array.isRequired,
  setBeers: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

export default BeerList;