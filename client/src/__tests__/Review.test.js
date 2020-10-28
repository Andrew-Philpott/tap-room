import React from "react";
import { shallow } from "enzyme";
import Review from "../components/Review";
import AuthContext from "../components/AuthContext";

const initialAuth = {
  userName: "",
  roles: [],
  isAuth: false,
  isAdmin: false,
  userId: 0,
  homeId: 0,
};

const setup = () => {
  const mockUseAuth = jest.fn().mockReturnValue([initialAuth, jest.fn()]);
  AuthContext.useAuth = mockUseAuth;
  return shallow(<Review />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = wrapper.find(`[data-test="component-review"]`);
  expect(component.length).toBe(1);
});
