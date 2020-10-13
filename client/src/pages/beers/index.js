import React from "react";
import { Link } from "react-router-dom";
import Plus from "../../svg/plus.svg";
import Minus from "../../svg/minus.svg";
import Trash from "../../svg/trash.svg";
import Pencil from "../../svg/pencil-alt.svg";
import {
  increaseBeerPintsAction,
  decreaseBeerPintsAction,
  deleteBeerAction,
} from "../../actions/beer";
import * as role from "../../constants/roles";
import * as route from "../../constants/routes";
import "../../css/beers.css";
import { useDispatch, useSelector } from "react-redux";

const BeerItem = ({ roles, beer, onDeleteBeer, onChangeBeerPints }) => {
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
              <Minus
                className="minus"
                onClick={() =>
                  beer.pints > 0 && onChangeBeerPints(true, beer.beerId)
                }
              />
            </td>
            <td>
              <Plus
                className="plus"
                onClick={() => onChangeBeerPints(false, beer.beerId)}
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

export default ({ roles, isAuth, isAdmin, getToken }) => {
  const dispatch = useDispatch();
  const beers = useSelector((state) => state.beers);
  const handleDeleteBeer = (id) => {
    if (window.confirm("Are you sure you want to delete this beer?")) {
      getToken().then((token) => {
        dispatch(deleteBeerAction(token, id));
      });
    }
  };
  const handleChangeBeerPints = (isMinus, id) => {
    getToken().then((token) => {
      dispatch(
        isMinus
          ? decreaseBeerPintsAction(token, id)
          : increaseBeerPintsAction(token, id)
      );
    });
  };

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
