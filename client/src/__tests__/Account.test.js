import React from "react";
import { mount } from "enzyme";
import Account from "../pages/Account";
import {
  initialAuth,
  mockUseAuth,
  mockSetMyReviews,
  mockSetError,
} from "../testutils";
import AuthContext from "../components/AuthContext";

const setup = ({ myReviews }) => {
  AuthContext.useAuth = mockUseAuth(initialAuth);
  return mount(
    <Account
      myReviews={myReviews}
      setError={mockSetError}
      setMyReviews={mockSetMyReviews}
    />
  );
};

test("renders without error", () => {
  const wrapper = setup({ myReviews: [] });
  const component = wrapper.find(`[data-test="component-account"]`);
  expect(component.length).toBe(1);
});
