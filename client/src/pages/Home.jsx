import React from "react";
import { Link } from "react-router-dom";
import BeerBar from "../assets/BeerBar.webp";
import { topFiveBeers } from "../other/utils";
import PropTypes from "prop-types";

const Home = ({ beers }) => {
  return (
    <div className="main-content home" data-test="component-home">
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
              {topFiveBeers(beers).map((x, index) => {
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

Home.propTypes = {
  beers: PropTypes.array.isRequired
}

export default Home;