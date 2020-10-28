import React from "react";
import { mount } from "enzyme";
import Account from "../pages/Account";

const setup = ({ myReviews }) => {
  myReviews = myReviews | [];

  return mount(<Account myReviews={myReviews} />);
};

test("renders without error", () => {
  const wrapper = setup({});
  const component = wrapper.find(`[data-test="component-account"]`);
  expect(component.length).toBe(1);
});
