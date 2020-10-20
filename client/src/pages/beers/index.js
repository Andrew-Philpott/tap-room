import React from "react";
import { Link, useHistory } from "react-router-dom";
import Plus from "../../svg/plus.svg";
import Minus from "../../svg/minus.svg";
import Trash from "../../svg/trash.svg";
import Pencil from "../../svg/pencil-alt.svg";
import {
  increaseBeerPints,
  decreaseBeerPints,
  deleteBeer,
  getBeers,
} from "../../actions/beer";
import * as role from "../../constants/roles";
import * as route from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../components/use-auth";

const BeerItem = ({ roles, beer, onDeleteBeer, onChangeBeerPints }) => {
  const history = useHistory();
  return (
    <tr key={beer.beerId}>
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
            beer.price > 12 ? "orange" : beer.price > 8 ? "yellow" : "green"
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

export default () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const beers = useSelector((state) => state.beers.beers);
  const history = useHistory();
  React.useEffect(() => {
    if (beers.length === 0) {
      dispatch(getBeers());
    }
  }, []);

  const handleDeleteBeer = (id) => {
    if (window.confirm("Are you sure you want to delete this beer?")) {
      getToken().then((token) => {
        dispatch(deleteBeer(token, id));
      });
    }
  };
  const handleChangeBeerPints = (isMinus, id) => {
    getToken().then((token) => {
      dispatch(
        isMinus ? decreaseBeerPints(token, id) : increaseBeerPints(token, id)
      );
    });
  };

  return (
    <div id="beer-list" className="main-content">
      <h1>Beers On Tap</h1>
      {auth.isAuth && (
        <div>
          <button
            onClick={() => history.push(route.NEW_REVIEW)}
            className="button"
          >
            Write a review
          </button>
          {auth.isAdmin && (
            <button
              onClick={() => history.push(route.NEW_BEER)}
              className="button"
            >
              Add a beer
            </button>
          )}
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
              {(auth.roles && auth.roles.indexOf(role.EMPLOYEE) !== -1) ||
                (auth.roles.indexOf(role.ADMIN) !== -1 && (
                  <React.Fragment>
                    <th>Buy</th>
                    <th>Restock</th>
                    {auth.roles.indexOf(role.ADMIN) !== -1 && (
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
                roles={auth.roles}
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