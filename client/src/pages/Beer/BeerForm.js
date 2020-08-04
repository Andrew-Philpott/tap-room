import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, TextField } from "@material-ui/core";
import { beerService } from "../../services/beer-service";
import { useStyles } from "../../components/use-styles";
import { useForm } from "../../components/useForm";
import { history } from "../../helpers/history";
import * as routes from "../../constants/routes";

const initialFieldValues = {
  name: "",
  brand: "",
  color: "",
  aroma: "",
  flavor: "",
  price: "",
  alcoholContent: "",
  pints: "",
};

export const BeerForm = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [apiErrors, setApiErrors] = useState(null);
  const { values, setValues, handleInputChange } = useForm(initialFieldValues);

  useEffect(() => {
    if (id) {
      beerService
        .getBeer(id)
        .then((response) => setValues(response))
        .catch(() =>
          setApiErrors(
            "There was a problem fetching the beer. Please try again later."
          )
        );
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    values.pints = parseInt(values.pints);
    values.price = parseInt(values.price);
    values.alcoholContent = parseInt(values.alcoholContent);

    if (
      values.name &&
      values.brand &&
      values.color &&
      values.aroma &&
      values.flavor &&
      values.price &&
      values.alcoholContent &&
      values.pints
    ) {
      if (id) {
        beerService
          .updateBeer(id, values)
          .then(() => {
            history.push(routes.BEER_LIST);
          })
          .catch(() =>
            setApiErrors(
              "There was a problem updating the beer. Please try again later."
            )
          );
      } else {
        beerService
          .createBeer(values)
          .then(() => {
            history.push(routes.BEER_LIST);
          })
          .catch(() =>
            setApiErrors(
              "There was a problem adding the beer to the list. Please try again later."
            )
          );
      }
    }
  }

  return (
    <Container
      className={`${classes.whiteText} ${classes.marginTopTwo}`}
      maxWidth="sm"
    >
      {apiErrors && <p className={classes.whiteTextLarge}>{apiErrors}</p>}
      <p className={classes.whiteTextLarge}>Add a new beer</p>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          fullWidth
          InputProps={{
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
          }}
          placeholder="Name"
          value={values.name}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          type="text"
          name="brand"
          fullWidth
          InputProps={{
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
          }}
          placeholder="Brand"
          value={values.brand}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          type="text"
          name="color"
          fullWidth
          InputProps={{
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
          }}
          placeholder="Color"
          value={values.color}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          type="text"
          name="aroma"
          fullWidth
          InputProps={{
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
          }}
          placeholder="Aroma"
          value={values.aroma}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          type="text"
          name="flavor"
          fullWidth
          InputProps={{
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
          }}
          placeholder="Flavor"
          value={values.flavor}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          type="text"
          name="price"
          fullWidth
          InputProps={{
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
          }}
          placeholder="Price"
          value={values.price}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          type="text"
          name="alcoholContent"
          fullWidth
          InputProps={{
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
          }}
          placeholder="Alcohol Content"
          value={values.alcoholContent}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          type="text"
          name="pints"
          fullWidth
          InputProps={{
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
          }}
          placeholder="# of pints"
          value={values.pints}
          onChange={handleInputChange}
          variant="outlined"
        />
        <Button
          className={`${classes.buttons} ${classes.marginTopTwo} ${classes.floatRight}`}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};
