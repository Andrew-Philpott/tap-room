import reviewReducer from "../../reducers/review-reducer";
import reviewConstants from "../../constants/review-constants";

describe("reviewReducer", () => {
  let action;
  const review = {
    reviewId: 1,
    name: "Universale",
    brand: "Fremont",
    color: "Golden caramel",
    aroma: "Citrus, apple, biscuit",
    flavor: "Pine, orange, bready",
    price: 5,
    alcoholContent: 5.6,
    pints: 124,
  };
  const updatedreview = {
    ...review,
    pints: 120,
  };
  const initalState = { item: {}, items: [] };

  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(reviewReducer(initalState, { type: null })).toEqual({
      item: {},
      items: [],
    });
  });

  test("Should successfully add a new review to the review list", () => {
    action = {
      type: reviewConstants.CREATE_REVIEW_SUCCESS,
      payload: review,
    };

    expect(reviewReducer(initalState, action)).toEqual({
      item: {},
      items: [action.payload],
    });
  });

  test("Should successfully retrieve a review", () => {
    action = {
      type: reviewConstants.GET_REVIEW_SUCCESS,
      payload: review,
    };

    expect(reviewReducer({ item: {}, items: [] }, action)).toEqual({
      item: action.payload,
      items: [],
    });
  });

  test("Should successfully delete a review from the review list", () => {
    action = {
      type: reviewConstants.DELETE_REVIEW_SUCCESS,
      payload: review,
    };

    expect(reviewReducer({ item: {}, items: [review] }, action)).toEqual({
      item: {},
      items: [],
    });
  });

  test("Should successfully update a review in the review list", () => {
    action = {
      type: reviewConstants.UPDATE_REVIEW_SUCCESS,
      payload: updatedreview,
    };

    expect(reviewReducer({ item: {}, items: [review] }, action)).toEqual({
      item: {},
      items: [action.payload],
    });
  });
});
