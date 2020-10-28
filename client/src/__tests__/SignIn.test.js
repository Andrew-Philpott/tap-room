import React from "react";
import { shallow } from "enzyme";
import SignIn from "../pages/SignIn";

test("renders without error", () => {
  const wrapper = shallow(<SignIn />);
  const component = wrapper.find(`[data-test="component-sign-in"]`);
  expect(component.length).toBe(1);
});
