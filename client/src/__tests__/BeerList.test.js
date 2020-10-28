import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import BeerList from "../pages/BeerList";

const setup = ({ beers, roles }) => {
  return mount(
    <BrowserRouter>
      <BeerList beers={beers} roles={roles} />
    </BrowserRouter>
  );
};

test("renders without error", () => {
  const wrapper = setup({ beers: [], roles: [] });
  const component = wrapper.find(`[data-test="component-beer-list"]`);
  expect(component.length).toBe(1);
});
test("renders an empty list of beers when there are no beers", () => {
  const wrapper = setup({ beers: [], roles: [] });
  const beerItems = wrapper.find(`[data-test="component-beer-item"]`);
  expect(beerItems.length).toBe(0);
});
test("renders a beer item when there is 1 beer in the list", () => {
  const wrapper = setup({
    beers: [
      {
        beerId: 1,
        brand: "test",
        flavor: "test",
        aroma: "test",
        alcoholContent: "test",
        pints: 1,
        price: 8,
      },
    ],
    roles: [],
  });
  const beerItems = wrapper.find(`[data-test="component-beer-item"]`);
  expect(beerItems.length).toBe(1);
});
test("renders multiple beer items", () => {
  const wrapper = setup({
    beers: [
      {
        beerId: 1,
        brand: "test",
        flavor: "test",
        aroma: "test",
        alcoholContent: "test",
        pints: 1,
        price: 8,
      },
      {
        beerId: 2,
        brand: "test",
        flavor: "test",
        aroma: "test",
        alcoholContent: "test",
        pints: 2,
        price: 9,
      },
    ],
    roles: [],
  });
  const beerItems = wrapper.find(`[data-test="component-beer-item"]`);
  expect(beerItems.length).toBe(2);
});
