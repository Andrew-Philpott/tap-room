import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { beerService } from "../../services/beer-service";
import { reviewService } from "../../services/review-service";
import { useStyles } from "../../components/use-styles";

export const NewReviewForm = () => {
  const classes = useStyles();
  const [beers, setBeers] = useState(null);
  const [review, setReview] = useState({
    rating: "",
    description: "",
    beerId: 0,
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    beerService.getBeers().then((res) => {
      setBeers(res);
    });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setReview((review) => ({ ...review, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (review.rating && review.description && review.beerId) {
      reviewService.createReview(review);
    }
  }

  return (
    <div style={{ marginTop: "10px" }} className={"col-lg-8 offset-lg-2"}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "48%" }} className="form-group">
            <label style={{ color: "white" }}>Select a beer</label>
            <select
              onChange={handleChange}
              value={review.beerId}
              name="beerId"
              id="beerId"
              className={
                "form-control" +
                (submitted && review.beerId === 0 ? " is-invalid" : "")
              }
            >
              <option key={0} value={0}></option>
              {beers &&
                beers
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.brand}&nbsp;{item.name}
                      </option>
                    );
                  })}
            </select>
            {submitted && review.beerId === 0 && (
              <div className="invalid-feedback">Select a beer</div>
            )}
          </div>
          <div style={{ width: "48%" }} className="form-group">
            <label style={{ color: "white" }}>Rating</label>
            <select
              onChange={handleChange}
              value={review.rating}
              name="rating"
              id="rating"
              className={
                "form-control" +
                (submitted && review.rating === 0 ? " is-invalid" : "")
              }
            >
              <option key={0} value={0}></option>
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
            {submitted && !review.rating && (
              <div className="invalid-feedback">Rating is required</div>
            )}
          </div>
        </div>
        <div className="form-group">
          <label style={{ color: "white" }}>Comments</label>
          <textarea
            value={review.description}
            onChange={handleChange}
            id="description"
            rows="5"
            type="text"
            name="description"
            className={
              "form-control" +
              (submitted && !review.description ? " is-invalid" : "")
            }
          />
          {submitted && !review.description && (
            <div className="invalid-feedback">Comments are required</div>
          )}
        </div>

        <Button type="submit">Submit Review</Button>
      </form>
    </div>
  );
};
