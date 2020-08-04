import React, { useState, useEffect } from "react";
import { beerService } from "../services/beer-service";
import { reviewService } from "../services/review-service";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { history } from "../helpers/history";
import { useForm } from "./useForm";
import { useStyles } from "./use-styles";

export const ReviewForm = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [beers, setBeers] = useState(null);
  const [apiErrors, setApiErrors] = useState(null);
  const { values, handleInputChange } = useForm({
    beerId: id ? parseInt(id) : 0,
    rating: "",
    description: "",
  });

  useEffect(() => {
    if (!id) {
      beerService
        .getBeers()
        .then((response) => setBeers(response))
        .catch(() =>
          setApiErrors(
            "Something went wrong fetching the list of available beers. Please try again later."
          )
        );
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (values.rating && values.description && values.beerId) {
      reviewService
        .createReview(values)
        .then(() => {
          history.push(`/beers/${id}`);
        })
        .catch(() =>
          setApiErrors(
            "Something went wrong trying to write a review. Please try again later."
          )
        );
    }
  }
  return (
    <Container
      className={`${classes.whiteText} ${classes.marginTopTwo}`}
      maxWidth="sm"
    >
      {apiErrors && <p className={classes.whiteTextLarge}>{apiErrors}</p>}

      <form method="POST" onSubmit={handleSubmit}>
        {beers && (
          <React.Fragment>
            <InputLabel htmlFor="beerId">Select a beer</InputLabel>
            <TextField
              name="beerId"
              fullWidth
              select
              InputProps={{
                classes: {
                  notchedOutline: classes.whiteTextField,
                },
                className: `${classes.whiteText} ${classes.marginTopTwo}`,
              }}
              value={values.beerId}
              onChange={handleInputChange}
              variant="outlined"
            >
              {beers &&
                beers.map((beer) => {
                  return (
                    <MenuItem key={1} value={beer.beerId}>
                      {beer.name}
                    </MenuItem>
                  );
                })}
            </TextField>
          </React.Fragment>
        )}
        <InputLabel
          className={`${classes.whiteText} ${classes.marginTopTwo}`}
          htmlFor="rating"
        >
          Rating
        </InputLabel>
        <TextField
          name="rating"
          fullWidth
          select
          InputProps={{
            classes: {
              notchedOutline: classes.whiteTextField,
            },
            className: `${classes.whiteText}`,
          }}
          placeholder="Rating"
          value={values.rating}
          onChange={handleInputChange}
          variant="outlined"
        >
          <MenuItem key={1} value={1}>
            1 Star
          </MenuItem>
          <MenuItem key={2} value={2}>
            2 Stars
          </MenuItem>
          <MenuItem key={3} value={3}>
            3 Stars
          </MenuItem>
          <MenuItem key={4} value={4}>
            4 Stars
          </MenuItem>
          <MenuItem key={5} value={5}>
            5 Stars
          </MenuItem>
        </TextField>
        <InputLabel
          className={`${classes.whiteText} ${classes.marginTopTwo}`}
          htmlFor="description"
        >
          Description
        </InputLabel>
        <TextField
          type="text"
          name="description"
          fullWidth
          multiline={true}
          rows={5}
          InputProps={{
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText}`,
          }}
          placeholder="Smooth and great taste."
          value={values.description}
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
