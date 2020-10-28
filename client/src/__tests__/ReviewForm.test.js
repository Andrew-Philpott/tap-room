import React from "react";
import { mount } from "enzyme";
import ReviewForm from "../pages/ReviewForm";
import AuthContext from "../components/AuthContext";
import { MemoryRouter } from "react-router";
import {
  initialAuth,
  mockUseAuth,
  mockSetError,
  mockSetMyReviews,
} from "../testutils";

const setup = ({ beers, myReviews }) => {
  AuthContext.useAuth = mockUseAuth(initialAuth);
  return mount(
    <MemoryRouter initialEntries={["/reviews/new"]}>
      <ReviewForm
        beers={beers}
        myReviews={myReviews}
        setMyReviews={mockSetMyReviews}
        setError={mockSetError}
      />
    </MemoryRouter>
  );
};

test("renders without error", () => {
  const wrapper = setup({ beers: [], myReviews: [] });
  const component = wrapper.find(`[data-test="component-review-form"]`);
  expect(component.length).toBe(1);
});
