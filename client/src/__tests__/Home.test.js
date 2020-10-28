import React from "react";
import { shallow } from "enzyme";
import Home from "../pages/Home";

test("renders without error", () => {
  const wrapper = shallow(<Home />);
  const component = wrapper.find(`[data-test="component-home"]`);
  expect(component.length).toBe(1);
});
