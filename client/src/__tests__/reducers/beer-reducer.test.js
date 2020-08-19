import beerReducer from "../../reducers/beer-reducer";
import beerConstants from "../../constants/beer-constants";

describe("beerReducer", () => {
  let action;
  const beer = {
    beerId: 1,
    name: "Universale",
    brand: "Fremont",
    color: "Golden caramel",
    aroma: "Citrus, apple, biscuit",
    flavor: "Pine, orange, bready",
    price: 5,
    alcoholContent: 5.6,
    pints: 124,
  };
  const updatedBeer = {
    ...beer,
    pints: 120,
  };
  const initalState = { item: {}, items: [] };

  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(beerReducer(initalState, { type: null })).toEqual({
      item: {},
      items: [],
    });
  });

  test("Should successfully add a new beer to the beer list", () => {
    action = {
      type: beerConstants.CREATE_BEER_SUCCESS,
      payload: beer,
    };

    expect(beerReducer(initalState, action)).toEqual({
      item: {},
      items: [action.payload],
    });
  });

  test("Should successfully retrieve a beer from the beer list", () => {
    action = {
      type: beerConstants.GET_BEER_SUCCESS,
      payload: 1,
    };

    expect(beerReducer({ item: {}, items: [beer] }, action)).toEqual({
      item: beer,
      items: [beer],
    });
  });

  test("Should successfully delete a beer from the beer list", () => {
    action = {
      type: beerConstants.DELETE_BEER_SUCCESS,
      payload: beer,
    };

    expect(beerReducer({ item: {}, items: [beer] }, action)).toEqual({
      item: {},
      items: [],
    });
  });

  test("Should successfully update a beer in the beer list", () => {
    action = {
      type: beerConstants.UPDATE_BEER_SUCCESS,
      payload: updatedBeer,
    };

    expect(beerReducer({ item: {}, items: [beer] }, action)).toEqual({
      item: {},
      items: [action.payload],
    });
  });

  test("Should successfully increase the number of pints for a beer", () => {
    let increasedPints = { ...beer };
    increasedPints.pints += 1;
    action = {
      type: beerConstants.INCREASE_BEER_PINTS_SUCCESS,
      payload: increasedPints,
    };

    expect(beerReducer({ item: {}, items: [beer] }, action)).toEqual({
      item: {},
      items: [increasedPints],
    });
  });

  test("Should successfully decrease the number of pints for a beer", () => {
    let decreasedPints = { ...beer };
    decreasedPints.pints -= 1;
    action = {
      type: beerConstants.DECREASE_BEER_PINTS_SUCCESS,
      payload: decreasedPints,
    };

    expect(beerReducer({ item: {}, items: [beer] }, action)).toEqual({
      item: {},
      items: [decreasedPints],
    });
  });
});
