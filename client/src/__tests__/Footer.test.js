import React from "react";
import { shallow } from "enzyme";
import Footer from "../components/Footer";

test("renders without error", () => {
  const wrapper = shallow(<Footer />);
  const component = wrapper.find(`[data-test="component-footer"]`);
  expect(component.length).toBe(1);
});
