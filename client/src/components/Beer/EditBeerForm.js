import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles, Container } from "@material-ui/core";
import { beerActions } from "../../actions/beer-actions";

const useStyles = makeStyles({
  white: {
    color: "white",
  },
  buttons: {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white !important",
    },
  },
});

export const EditBeerForm = () => {
  const classes = useStyles();
  const { id } = useParams();
  const beer = useSelector((state) => state.beers.item);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(beerActions.getBeer(parseInt(id)));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const beer = {
      name: event.target.name.value,
      brand: event.target.brand.value,
      color: event.target.color.value,
      aroma: event.target.aroma.value,
      flavor: event.target.flavor.value,
      price: parseInt(event.target.price.value),
      alcoholContent: parseInt(event.target.alcoholContent.value),
      pints: parseInt(event.target.pints.value),
    };
    console.log(beer);
    dispatch(beerActions.updateBeer(id, beer));
  }
  if (beer) {
    return (
      <div className={classes.mainContext}>
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className={classes.white}>Name:</label>
              <input
                defaultValue={beer.name}
                id="name"
                type="text"
                name="name"
                className={"form-control"}
              />
            </div>
            <div className="form-group">
              <label className={classes.white}>Brand:</label>
              <input
                defaultValue={beer.brand}
                id="brand"
                type="text"
                name="brand"
                className={"form-control"}
              />
            </div>
            <div className="form-group">
              <label className={classes.white} htmlFor="color">
                Color:
              </label>
              <input
                defaultValue={beer.color}
                id="color"
                type="text"
                name="color"
                className={"form-control"}
              />
            </div>
            <div className="form-group">
              <label className={classes.white} htmlFor="aroma">
                Aroma:
              </label>
              <input
                defaultValue={beer.aroma}
                id="aroma"
                type="text"
                name="aroma"
                className={"form-control"}
              />
            </div>
            <div className="form-group">
              <label className={classes.white} htmlFor="flavor">
                Flavor:
              </label>
              <input
                defaultValue={beer.flavor}
                id="flavor"
                type="text"
                name="flavor"
                className={"form-control"}
              />
            </div>
            <div className="form-group">
              <label className={classes.white} htmlFor="price">
                Price:
              </label>
              <input
                defaultValue={beer.price}
                id="price"
                type="text"
                name="price"
                className={"form-control"}
              />
            </div>
            <div className="form-group">
              <label className={classes.white} htmlFor="alcoholContent">
                Alcohol content:
              </label>
              <input
                defaultValue={beer.alcoholContent}
                id="alcoholContent"
                type="text"
                name="alcoholContent"
                className={"form-control"}
              />
            </div>
            <div className="form-group">
              <label className={classes.white} htmlFor="pints">
                Pints:
              </label>
              <input
                defaultValue={beer.pints}
                id="pints"
                type="text"
                name="pints"
                className={"form-control"}
              />
            </div>
            <Button className={classes.buttons} type="submit">
              Edit Beer
            </Button>
          </form>
        </Container>
      </div>
    );
  } else {
    return <h1>Loading..</h1>;
  }
};
