import React from "react";
import { shallow } from "enzyme";
import About from "../pages/About";

test("renders without error", () => {
  const wrapper = shallow(<About />);
  const component = wrapper.find(`[data-test="component-about"]`);
  expect(component.length).toBe(1);
});
