import React from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default ({ ...props }) => {
  const { beers, user } = props;
  const { id } = useParams();
  const beer = beers && beers.find((x) => x.beerId === parseInt(id));

  return (
    <Container maxWidth="md" className="white-text mrgn-t16">
      {beer && (
        <Grid container>
          <Grid item xs={8}>
            <h1>{beer.name}</h1>
          </Grid>
          <Grid item xs={4}>
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
      {beer && beer.reviews && beer.reviews.length !== 0 ? (
        <React.Fragment>
          <h1>Reviews</h1>
          {beer.reviews.map((review, index) => {
            return (
              <Grid direction="column" container key={index}>
                <Grid item xs={10}>
                  <p>
                    User:{" "}
                    <Link to={`/reviews/user/${review.user.userId}`}>
                      {review.user.userName}
                    </Link>
                  </p>
                  <p>Rating: {review.rating}</p>
                  <p>Description: {review.description}</p>
                </Grid>
                <Grid item xs={2} />
              </Grid>
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
