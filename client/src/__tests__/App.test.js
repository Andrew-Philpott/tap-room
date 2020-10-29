import React from "react";
import { mount } from "enzyme";
import App from "../App";
import AuthContext from "../components/AuthContext";
import { mockUseAuth } from "../testutils";
import beerService from "../other/beer-service";

const mockGetBeers = jest.fn(() => Promise.resolve([]));

const setup = () => {
  AuthContext.useAuth = mockUseAuth;
  mockGetBeers.mockClear();
  beerService.getBeers = mockGetBeers;
  return mount(<App />);
};
test("renders without error", () => {
  const wrapper = setup();
  const component = wrapper.find(`[data-test="component-app"]`);
  expect(component.length).toBe(1);
});
describe("getBeers calls", () => {
  const wrapper = setup();

  test("getBeers gets called on app mount", () => {
    expect(mockGetBeers).toHaveBeenCalled();
  });
  test("beers does not update on app update", () => {
    mockGetBeers.mockClear();
    wrapper.setProps();
    expect(mockGetBeers).not.toHaveBeenCalled();
  });
});
