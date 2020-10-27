import React from "react";
import useForm from "../other/use-form";
import { useParams, useLocation, useHistory } from "react-router-dom";

const initalFieldValues = {
  beerId: "",
  rating: "",
  description: "",
  headline: "",
};

export default ({ beers, myReviews, setMyReviews, getToken, setError }) => {
  const { id } = useParams();
  const history = useHistory();
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
    let temp = { ...formErrors };
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

    setFormErrors({ ...temp });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    formErrors,
    setFormErrors,
    handleInputChange,
  } = useForm(initalFieldValues);

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

 async function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      const { createReview, updateReview } = await import("../other/review-service");
      parsedId
        ? updateReview(getToken(), parsedId, values)
            .then((response) => {
              setMyReviews([
                ...myReviews.map((x) =>
                  x.reviewId === response.reviewId ? response : x
                ),
              ]);
              history.push(`/beers/details/${values.beerId}`);
            })
            .catch(setError)
        : createReview(getToken(), values)
            .then((response) => {
              setMyReviews([...myReviews, response]);
              history.push(`/beers/details/${values.beerId}`);
            })
            .catch(setError);
    }
  }
  return (
    <div className="main-content" data-test="component-review-form">
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
                <div className="form-control">
                  <label htmlFor="beerId">Select a beer</label>
                  <select
                    className="input"
                    name="beerId"
                    value={values.beerId}
                    onChange={handleInputChange}
                  >
                    <option key="" value="" />
                    {availableBeersToReview &&
                      availableBeersToReview.map((beer, index) => {
                        return (
                          <option key={index} value={beer.beerId}>
                            {beer.name}
                          </option>
                        );
                      })}
                  </select>
                  <svg viewBox="0 0 24 24">
                    <path fill="white" d="M 7 10 l 5 5 l 5 -5 Z" />
                  </svg>
                </div>
              </React.Fragment>
            )}
            <div className="form-control">
              <label htmlFor="rating">Rating</label>
              <select
                className="input"
                name="rating"
                value={values.rating}
                onChange={handleInputChange}
              >
                <option key="" value="" />
                <option key={1} value={1}>
                  1 Star
                </option>
                <option key={2} value={2}>
                  2 Stars
                </option>
                <option key={3} value={3}>
                  3 Stars
                </option>
                <option key={4} value={4}>
                  4 Stars
                </option>
                <option key={5} value={5}>
                  5 Stars
                </option>
              </select>
              <svg viewBox="0 0 24 24">
                <path fill="white" d="M 7 10 l 5 5 l 5 -5 Z" />
              </svg>
              {formErrors.rating && <div>{formErrors.rating}</div>}
            </div>
            <div className="form-control">
              <label htmlFor="headline">Headline (20-80 characters)</label>
              <input
                className="input"
                type="text"
                name="headline"
                onChange={handleInputChange}
              />
              {values.headline.length > 0 && (
                <span className="character-count">
                  Headline: {values.headline.length} characters
                </span>
              )}
              {formErrors.headline && <div>{formErrors.headline}</div>}
            </div>

            <div className="form-control">
              <label htmlFor="description">
                Description (50-500 characters)
              </label>
              <textarea
                className="input"
                name="description"
                rows={5}
                value={values.description}
                onChange={handleInputChange}
              />
              {values.description.length > 0 && (
                <span className="character-count">
                  Description: {values.description.length} characters
                </span>
              )}
              {formErrors.description && <div>{formErrors.description}</div>}
            </div>
            <button className="button" type="submit">
              Submit
            </button>
          </form>
        </React.Fragment>
      ) : (
        <h1>You've reviewed all of our beers already!</h1>
      )}
    </div>
  );
};
