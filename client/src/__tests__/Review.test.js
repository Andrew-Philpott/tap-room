import React from "react";
import { shallow } from "enzyme";
import Review from "../components/Review";
import AuthContext from "../components/AuthContext";
import { noAuth, mockUseAuth, reviewWithoutLikes } from "../testutils";

const mockLikeReview = jest.fn();
const mockDeleteReview = jest.fn();

const setup = ({ review, isAccount }) => {
  AuthContext.useAuth = mockUseAuth;
  return shallow(
    <Review
      review={review}
      isAccount={isAccount}
      onLikeReview={mockLikeReview}
      onDeleteReview={mockDeleteReview}
    />
  );
};

test("renders without error", () => {
  const wrapper = setup({ review: reviewWithoutLikes, isAccount: false });
  const component = wrapper.find(`[data-test="component-review"]`);
  expect(component.length).toBe(1);
});
