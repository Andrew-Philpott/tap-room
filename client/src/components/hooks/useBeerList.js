import React from "react";
import beerService from "../../services/beer-service";

export default (setError) => {
  const [beers, setBeers] = React.useState([]);
  React.useEffect(() => {
    if (beers.length === 0) {
      beerService
        .getBeers()
        .then((response) => setBeers(response))
        .catch(() =>
          setError(
            "Something went wrong trying to fetch the list beers. Please try again later."
          )
        );
    }
  }, [beers]);
  return { beers, setBeers };
};
