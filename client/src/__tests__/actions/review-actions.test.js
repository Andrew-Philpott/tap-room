import reviewActions from "../../actions/review-actions";
import reviewConstants from "../../constants/review-constants";

describe("review actions", () => {
  const reviews = [
    {
      beerId: 1,
      rating: 4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      beerId: 2,
      rating: 4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  it("getReviewSuccess should create GET_REVIEW_SUCCESS", () => {
    expect(reviewActions.success.getReviewSuccess(reviews[0])).toEqual({
      type: reviewConstants.GET_REVIEW_SUCCESS,
      payload: reviews[0],
    });
  });

  it(" should create GET_REVIEWS_SUCCESS", () => {
    expect(reviewActions.success.getReviewsSuccess(reviews)).toEqual({
      type: reviewConstants.GET_REVIEWS_SUCCESS,
      payload: reviews,
    });
  });

  it("createReviewSuccess should create CREATE_REVIEW_SUCCESS", () => {
    expect(reviewActions.success.createReviewSuccess(reviews[0])).toEqual({
      type: reviewConstants.CREATE_REVIEW_SUCCESS,
      payload: reviews[0],
    });
  });

  it("updateReviewSuccess should create UPDATE_REVIEW_SUCCESS", () => {
    expect(reviewActions.success.updateReviewSuccess(reviews[0])).toEqual({
      type: reviewConstants.UPDATE_REVIEW_SUCCESS,
      payload: reviews[0],
    });
  });

  it("deleteReviewSuccess should create DELETE_REVIEW_SUCCESS", () => {
    expect(reviewActions.success.deleteReviewSuccess(reviews[0])).toEqual({
      type: reviewConstants.DELETE_REVIEW_SUCCESS,
      payload: reviews[0],
    });
  });
});
