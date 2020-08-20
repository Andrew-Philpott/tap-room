import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import BeerPic from "../../assets/img/BeerPic.jpg";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import beerActions from "../../actions/beer-actions";
import { Link } from "react-router-dom";

const Home = ({ ...props }) => {
  const { beers, getBeers } = props;
  React.useEffect(() => {
    if (beers.length === 0) {
      getBeers();
    }
  }, []);

  const average = (array) => array.reduce((a, b) => a + b) / array.length;
  const highestRatedBeers = beers
    .filter((x) => x.reviews.length !== 0)
    .map((x) => {
      return {
        beer: x,
        averageRating: average(x.reviews.map((r) => r.rating)),
      };
    })
    .sort((a, b) => (a.rating > b.rating ? 1 : -1))
    .slice(0, 3);

  return (
    <Container>
      <CardMedia style={{ height: "300px", width: "100%" }} image={BeerPic} />
      <Grid className="white-text" container>
        <Grid item xs={1} />
        <Grid item xs={6}>
          <h1>
            {beers ? (
              <>
                <i>{beers.length} beers on tap!</i>
              </>
            ) : (
              <>Sorry, we're all out at the moment</>
            )}
          </h1>
        </Grid>
        <Grid item xs={4}>
          {highestRatedBeers.length !== 0 && (
            <React.Fragment>
              <h1>
                <i>Local favorites:</i>
              </h1>
              {highestRatedBeers.map((x, index) => {
                return (
                  <p key={index}>
                    {index + 1}.{" "}
                    <Link to={`/beers/${parseInt(x.beer.beerId)}`}>
                      <i>{x.beer.name}</i>
                    </Link>
                    &nbsp;&nbsp;
                    {x.averageRating}/5
                  </p>
                );
              })}
            </React.Fragment>
          )}
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  beers: state.beers.items,
});

const mapActionToProps = {
  getBeers: beerActions.getBeers,
};

export default connect(mapStateToProps, mapActionToProps)(Home);
