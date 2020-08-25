import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import useForm from "../components/useForm";
import { useParams, useLocation } from "react-router-dom";

const initalFieldValues = {
  beerId: "",
  rating: "",
  description: "",
  headline: "",
};

export default ({ beers, myReviews, onReviewFormSubmit }) => {
  const { id } = useParams();
  const path = useLocation().pathname;
  const parsedId = parseInt(id);
  const beerSelected = path.indexOf("/reviews/new/") !== -1 ? true : false;
  const isEditReview = path.indexOf("/reviews/edit") !== -1 ? true : false;
  const reviewedBeers = myReviews.map((x) => x.beerId);

  const availableBeersToReview =
    beers.length !== 0 && myReviews
      ? beers.filter((beer) => !reviewedBeers.includes(beer.beerId))
      : [];

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("rating" in fieldValues)
      temp.rating =
        fieldValues.rating >= 1 && fieldValues.rating <= 5
          ? ""
          : "Rating must be between 1 and 5.";
    if ("headline" in fieldValues)
      temp.headline =
        fieldValues.headline.length >= 20 && fieldValues.headline.length <= 100
          ? ""
          : "Headline must be between 20 and 100 characters.";
    if ("description" in fieldValues)
      temp.description =
        fieldValues.description.length >= 50 &&
        fieldValues.description.length <= 500
          ? ""
          : "Description must be between 50 and 500 characters.";

    setErrors({ ...temp });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initalFieldValues
  );

  React.useEffect(() => {
    if (beers.length !== 0) {
      let temp = { ...values };
      if (beerSelected) {
        temp.beerId = parsedId;
      } else if (isEditReview && myReviews.length !== 0) {
        const review = myReviews.find((x) => x.reviewId === parsedId);
        temp = review;
      }
      setValues(temp);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      isEditReview
        ? onReviewFormSubmit(parsedId, values)
        : onReviewFormSubmit(null, values);
      setValues(initalFieldValues);
    }
  }
  return (
    <Container className="main-content" maxWidth="md">
      {beers.length === 0 ? (
        <h1>There are no beers to review, sorry!</h1>
      ) : isEditReview ||
        (availableBeersToReview.length !== 0 && !isEditReview) ? (
        <React.Fragment>
          {beers.length !== 0 && beerSelected ? (
            <h1>{beers.find((x) => x.beerId === parsedId).name}</h1>
          ) : isEditReview ? (
            <h1>
              {
                beers.find(
                  (x) =>
                    x.beerId ===
                    myReviews.find((x) => x.reviewId === parsedId).beerId
                ).name
              }
            </h1>
          ) : (
            <h1>Write a review</h1>
          )}
          <form
            autoComplete="off"
            method="post"
            noValidate
            onSubmit={handleSubmit}
          >
            {!beerSelected && !isEditReview && (
              <React.Fragment>
                <label htmlFor="beerId">Select a beer</label>
                <TextField
                  name="beerId"
                  fullWidth
                  select
                  value={values.beerId}
                  onChange={handleInputChange}
                  variant="outlined"
                >
                  <MenuItem key="" value=""></MenuItem>
                  {availableBeersToReview &&
                    availableBeersToReview.map((beer, index) => {
                      return (
                        <MenuItem key={index} value={beer.beerId}>
                          {beer.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </React.Fragment>
            )}
            <label htmlFor="rating">Rating</label>
            <TextField
              name="rating"
              fullWidth
              select
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
            {errors.rating && <div>{errors.rating}</div>}
            <label htmlFor="headline">Headline (20-80 characters)</label>
            <div className="text-box-container">
              <TextField
                type="text"
                name="headline"
                fullWidth
                value={values.headline}
                onChange={handleInputChange}
                variant="outlined"
              />
              {values.headline.length > 0 && (
                <span className="character-count">
                  Headline: {values.headline.length} characters
                </span>
              )}
              {errors.headline && <div>{errors.headline}</div>}
            </div>
            <label htmlFor="description">Description (50-500 characters)</label>
            <div className="text-box-container">
              <TextField
                type="text"
                name="description"
                fullWidth
                multiline={true}
                rows={5}
                value={values.description}
                onChange={handleInputChange}
                variant="outlined"
              />
              {values.description.length > 0 && (
                <span className="character-count">
                  Description: {values.description.length} characters
                </span>
              )}
              {errors.description && <div>{errors.description}</div>}
            </div>
            <Button className="button" type="submit">
              Submit
            </Button>
          </form>
        </React.Fragment>
      ) : (
        <h1>You've reviewed all of our beers already!</h1>
      )}
    </Container>
  );
};
