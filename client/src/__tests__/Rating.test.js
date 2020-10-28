import React from "react";
import { shallow } from "enzyme";
import Rating from "../components/Rating";

test("renders without error", () => {
  const wrapper = shallow(<Rating />);
  const component = wrapper.find(`[data-test="component-rating"]`);
  expect(component.length).toBe(1);
});
