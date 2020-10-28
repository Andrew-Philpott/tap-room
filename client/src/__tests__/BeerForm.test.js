import React from "react";
import { shallow } from "enzyme";
import BeerForm from "../pages/BeerForm";

test("renders without error", () => {
  const wrapper = shallow(<BeerForm />);
  const component = wrapper.find(`[data-test="component-beer-form"]`);
  expect(component.length).toBe(1);
});
