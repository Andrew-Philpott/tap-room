import React from "react";
import { shallow } from "enzyme";
import BeerDetail from "../pages/BeerDetail";

test("renders without error", () => {
  const wrapper = shallow(<BeerDetail />);
  const component = wrapper.find(`[data-test="component-beer-detail"]`);
  expect(component.length).toBe(1);
});
