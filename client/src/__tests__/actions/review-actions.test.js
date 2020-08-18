import { reviewActions } from "../../actions/review-actions";
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

  it("getBeerSuccess should create GET_BEER_SUCCESS", () => {
    expect(beerActions.getBeerSuccess(beers[0])).toEqual({
      type: beerConstants.GET_BEER_SUCCESS,
      payload: beers[0],
    });
  });

  it("getBeersSuccess should create GET_BEERS_SUCCESS", () => {
    expect(beerActions.getBeersSuccess(beers)).toEqual({
      type: beerConstants.GET_BEERS_SUCCESS,
      payload: beers,
    });
  });

  it("createBeerSuccess should create CREATE_BEER_SUCCESS", () => {
    expect(beerActions.createBeerSuccess(beers[0])).toEqual({
      type: beerConstants.CREATE_BEER_SUCCESS,
      payload: beers[0],
    });
  });

  it("createBeerSuccess should create UPDATE_BEER_SUCCESS", () => {
    expect(beerActions.updateBeerSuccess(beers[0])).toEqual({
      type: beerConstants.UPDATE_BEER_SUCCESS,
      payload: beers[0],
    });
  });

  it("deleteBeerSuccess should create DELETE_BEER_SUCCESS", () => {
    expect(beerActions.deleteBeerSuccess(beers[0])).toEqual({
      type: beerConstants.DELETE_BEER_SUCCESS,
      payload: beers[0],
    });
  });
});
