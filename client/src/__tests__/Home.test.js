import React from "react";
import { shallow } from "enzyme";
import Home from "../pages/Home";

const setup = ({ beers }) => {
  return shallow(<Home beers={beers} />);
};

test("renders without error", () => {
  const wrapper = setup({ beers: [] });
  const component = wrapper.find(`[data-test="component-home"]`);
  expect(component.length).toBe(1);
});
