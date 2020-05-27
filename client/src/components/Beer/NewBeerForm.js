import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, makeStyles, Container } from "@material-ui/core";
import { beerActions } from "../../actions";

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

export const NewBeerForm = () => {
  const classes = useStyles();
  const [beer, setBeer] = useState({
    name: "",
    brand: "",
    color: "",
    aroma: "",
    flavor: "",
    price: "",
    alcoholContent: "",
    pints: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const creating = useSelector((state) => state.beers.creating);
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setBeer((beer) => ({ ...beer, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    beer.pints = parseInt(beer.pints);
    beer.price = parseInt(beer.price);
    beer.alcoholContent = parseInt(beer.alcoholContent);

    setSubmitted(true);
    if (
      beer.name &&
      beer.brand &&
      beer.color &&
      beer.aroma &&
      beer.flavor &&
      beer.price &&
      beer.alcoholContent &&
      beer.pints
    ) {
      dispatch(beerActions.createBeer(beer));
    }
  }

  return (
    <div className={classes.mainContext}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className={classes.white}>Name</label>
            <input
              value={beer.name}
              onChange={handleChange}
              id="name"
              type="text"
              name="name"
              className={
                "form-control" + (submitted && !beer.name ? " is-invalid" : "")
              }
            />
            {submitted && !beer.name && (
              <div className="invalid-feedback">Name is required</div>
            )}
          </div>

          <div className="form-group">
            <label className={classes.white}>Brand</label>
            <input
              value={beer.brand}
              onChange={handleChange}
              id="brand"
              type="text"
              name="brand"
              className={
                "form-control" + (submitted && !beer.brand ? " is-invalid" : "")
              }
            />
            {submitted && !beer.brand && (
              <div className="invalid-feedback">Brand is required</div>
            )}
          </div>

          <div className="form-group">
            <label className={classes.white} htmlFor="color">
              Color
            </label>
            <input
              value={beer.color}
              onChange={handleChange}
              id="color"
              type="text"
              name="color"
              className={
                "form-control" + (submitted && !beer.color ? " is-invalid" : "")
              }
            />
            {submitted && !beer.color && (
              <div className="invalid-feedback">Color is required</div>
            )}
          </div>

          <div className="form-group">
            <label className={classes.white} htmlFor="aroma">
              Aroma
            </label>
            <input
              value={beer.aroma}
              onChange={handleChange}
              id="aroma"
              type="text"
              name="aroma"
              className={
                "form-control" + (submitted && !beer.aroma ? " is-invalid" : "")
              }
            />
            {submitted && !beer.aroma && (
              <div className="invalid-feedback">Aroma is required</div>
            )}
          </div>

          <div className="form-group">
            <label className={classes.white} htmlFor="flavor">
              Flavor
            </label>
            <input
              value={beer.flavor}
              onChange={handleChange}
              id="flavor"
              type="text"
              name="flavor"
              className={
                "form-control" +
                (submitted && !beer.flavor ? " is-invalid" : "")
              }
            />
            {submitted && !beer.flavor && (
              <div className="invalid-feedback">Flavor is required</div>
            )}
          </div>

          <div className="form-group">
            <label className={classes.white} htmlFor="price">
              Price
            </label>
            <input
              value={beer.price}
              onChange={handleChange}
              id="price"
              type="text"
              name="price"
              className={
                "form-control" + (submitted && !beer.price ? " is-invalid" : "")
              }
            />
            {submitted && !beer.price && (
              <div className="invalid-feedback">Price is required</div>
            )}
          </div>

          <div className="form-group">
            <label className={classes.white} htmlFor="alcoholContent">
              Alcohol content
            </label>
            <input
              value={beer.alcoholContent}
              onChange={handleChange}
              id="alcoholContent"
              type="text"
              name="alcoholContent"
              className={
                "form-control" +
                (submitted && !beer.alcoholContent ? " is-invalid" : "")
              }
            />
            {submitted && !beer.alcoholContent && (
              <div className="invalid-feedback">
                Alcohol content is required
              </div>
            )}
          </div>

          <div className="form-group">
            <label className={classes.white} htmlFor="pints">
              Pints
            </label>
            <input
              value={beer.pints}
              onChange={handleChange}
              id="pints"
              type="text"
              name="pints"
              className={
                "form-control" + (submitted && !beer.pints ? " is-invalid" : "")
              }
            />
            {submitted && !beer.pints && (
              <div className="invalid-feedback">Pints is required</div>
            )}
          </div>

          <Button className={classes.buttons} type="submit">
            {creating && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Add Beer
          </Button>
        </form>
      </Container>
    </div>
  );
};
