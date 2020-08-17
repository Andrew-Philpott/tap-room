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

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ("rating" in fieldValues)
      fieldValues.rating = (fieldValues.rating >= 1 && fieldValues.rating <= 5) ? "" : "Rating must be between 1 and 5."
    if ("description" in fieldValues)
      fieldValues.description = (fieldValues.description.length >= 50 && fieldValues.description.length <= 500) ? "" : "Description must be between 50 and 500 characters."

    setErrors({ ...temp });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  }

  const { values, errors, setErrors, handleInputChange } = useForm({
    beerId: id ? parseInt(id) : 0,
    rating: "",
    description: "",
  }, validate);

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
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    if (values.rating && values.description && values.beerId) {
      reviewService
        .createReview(values)
        .then(() => {
          history.push(`/beers/${id}`);
        })
        .catch((error) =>
          setApiErrors(
            error
          )
        );
    }
  }
  return (
    <Container
      className={`${classes.whiteText} ${classes.marginTopTwo}`}
      maxWidth="sm"
    >
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
          {...(errors.rating && {
            error: true,
            helperText: errors.rating,
          })}
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
          {...(errors.description && {
            error: true,
            helperText: errors.description,
          })}
        />
        <Button
          className={`buttons ${classes.marginTopTwo} float-right`}
          type="submit"
        >
          Submit
        </Button>
      </form>
      {apiErrors && <p className="white-text-large">{apiErrors}</p>}
    </Container>
  );
};
