import React from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import beerActions from "../../actions/beer-actions";

const BeerDetail = ({ ...props }) => {
  const { beer, user, getBeer } = props;
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      getBeer(id);
    }
  }, [id]);

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
      {beer && beer.reviews && beer.reviews.length !== 0 ? (
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
const mapStateToProps = (state) => ({
  beer: state.beers.item,
  user: state.authentication.user,
});

const mapActionToProps = {
  getBeer: beerActions.getBeer,
};

export default connect(mapStateToProps, mapActionToProps)(BeerDetail);
