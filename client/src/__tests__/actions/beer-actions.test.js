import beerActions from "../../actions/beer-actions";
import beerConstants from "../../constants/beer-constants";

describe("beer actions", () => {
  const beers = [
    {
      beerId: 1,
      name: "A",
      brand: "A",
      color: "A",
      aroma: "A",
      flavor: "A",
      price: 5,
      alcoholContent: 7.6,
      pints: 20,
    },
    {
      beerId: 2,
      name: "B",
      brand: "B",
      color: "B",
      aroma: "B",
      flavor: "B",
      price: 5,
      alcoholContent: 7.6,
      pints: 20,
    },
  ];

  it("getBeerSuccess should create GET_BEER_SUCCESS", () => {
    expect(beerActions.success.getBeerSuccess(beers[0])).toEqual({
      type: beerConstants.GET_BEER_SUCCESS,
      payload: beers[0],
    });
  });

  it("getBeersSuccess should create GET_BEERS_SUCCESS", () => {
    expect(beerActions.success.getBeersSuccess(beers)).toEqual({
      type: beerConstants.GET_BEERS_SUCCESS,
      payload: beers,
    });
  });

  it("createBeerSuccess should create CREATE_BEER_SUCCESS", () => {
    expect(beerActions.success.createBeerSuccess(beers[0])).toEqual({
      type: beerConstants.CREATE_BEER_SUCCESS,
      payload: beers[0],
    });
  });

  it("createBeerSuccess should create UPDATE_BEER_SUCCESS", () => {
    expect(beerActions.success.updateBeerSuccess(beers[0])).toEqual({
      type: beerConstants.UPDATE_BEER_SUCCESS,
      payload: beers[0],
    });
  });

  it("deleteBeerSuccess should create DELETE_BEER_SUCCESS", () => {
    expect(beerActions.success.deleteBeerSuccess(beers[0])).toEqual({
      type: beerConstants.DELETE_BEER_SUCCESS,
      payload: beers[0],
    });
  });

  it("incrementPintsSuccess should create INCREASE_BEER_PINTS_SUCCESS", () => {
    expect(beerActions.success.incrementPintsSuccess(beers[0])).toEqual({
      type: beerConstants.INCREASE_BEER_PINTS_SUCCESS,
      payload: beers[0],
    });
  });

  it("decrementPintsSuccess should create DECREASE_BEER_PINTS_SUCCESS", () => {
    expect(beerActions.success.decrementPintsSuccess(beers[0])).toEqual({
      type: beerConstants.DECREASE_BEER_PINTS_SUCCESS,
      payload: beers[0],
    });
  });
});
