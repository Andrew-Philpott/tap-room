import React from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import beerActions from "../../actions/beer-actions";

export default () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const beer = useSelector((state) => state.beers.item);
  const user = useSelector((state) => state.authentication.user);

  React.useEffect(() => {
    if (id) {
      dispatch(beerActions.getBeer(parseInt(id)));
    }
  }, [id, dispatch]);

  return (
    <Container className="white-text mrgn-t16">
      {beer && (
        <Grid container>
          <Grid item xs={12}>
            <h1>{beer.name}</h1>
            {user && (
              <Button
                component={Link}
                to={`/reviews/${id}/new`}
                className="buttons float-right"
              >
                Write a review
              </Button>
            )}
          </Grid>
          <Grid item xs={6}>
            <p>Brand: {beer.brand}</p>
            <p>Color: {beer.color}</p>
            <p>Aroma: {beer.aroma}</p>
            <p>Flavor: {beer.flavor}</p>
          </Grid>
          <Grid item xs={6}>
            <p>Alcohol Content: {beer.alcoholContent}</p>
            <p>Price: ${beer.price}</p>
            <p>Pints Left: {beer.pints}</p>
          </Grid>
        </Grid>
      )}
      {beer && beer.reviews ? (
        <React.Fragment>
          {beer.reviews.map((review, index) => {
            return (
              <div key={index} id={index}>
                <h1>Reviews</h1>
                <p>User: {review.user.userName}</p>
                <p>Rating: {review.rating}</p>
                <p>Description: {review.description}</p>
              </div>
            );
          })}
        </React.Fragment>
      ) : (
        <h1>
          No reviews for this beer yet. Create an account to provide feedback!
        </h1>
      )}
    </Container>
  );
};
