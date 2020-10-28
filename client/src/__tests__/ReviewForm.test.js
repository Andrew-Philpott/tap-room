import React from "react";
import { shallow } from "enzyme";
import ReviewForm from "../pages/ReviewForm";

test("renders without error", () => {
  const wrapper = shallow(<ReviewForm />);
  const component = wrapper.find(`[data-test="component-review-form"]`);
  expect(component.length).toBe(1);
});
