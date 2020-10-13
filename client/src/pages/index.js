import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BeerBar from "../images/BeerBar.webp";
import { getBeersAction } from "../actions/beer";
import "../css/home.css";

export default () => {
  const dispatch = useDispatch();
  const beers = useSelector((state) => state.beers.beers);
  React.useEffect(() => {
    if (beers.length === 0) {
      dispatch(getBeersAction());
    }
  });
  console.log(beers);
  const average = (array) => array.reduce((a, b) => a + b) / array.length;
  return (
    <div className="main-content home">
      <img src={BeerBar} alt="Glass of a light beer on the bar" />
      <div>
        {beers.length !== 0 && (
          <div>
            <h2>Beers on tap</h2>
            <ul>
              {beers.map(
                (x, index) =>
                  index < 10 && (
                    <li key={index}>
                      <Link to={`/beers/details/${x.beerId}`}>{x.name}</Link>
                    </li>
                  )
              )}
            </ul>
            {beers.length >= 10 && <p>Plus several more!</p>}
          </div>
        )}
        {beers.length >= 5 && (
          <div>
            <h2>Top 5</h2>
            <ul>
              {beers
                .filter((x) => x.reviews && x.reviews.length !== 0)
                .map((x) => {
                  return {
                    beer: x,
                    averageRating: average(x.reviews.map((r) => r.rating)),
                  };
                })
                .sort((a, b) => (a.averageRating < b.averageRating ? 1 : -1))
                .slice(0, 5)
                .map((x, index) => {
                  return (
                    <li key={index}>
                      {index + 1}
                      {". "}
                      <Link to={`/beers/details/${x.beer.beerId}`}>
                        {x.beer.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
