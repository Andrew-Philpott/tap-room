import React from "react";
import { shallow } from "enzyme";
import Navigation from "../components/Navigation";
import AuthContext from "../components/AuthContext";
import { noAuth, mockUseAuth } from "../testutils";

const setup = () => {
  AuthContext.useAuth = mockUseAuth;
  return shallow(<Navigation />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = wrapper.find(`[data-test="component-navigation"]`);
  expect(component.length).toBe(1);
});
