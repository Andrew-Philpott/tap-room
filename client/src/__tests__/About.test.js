import React from "react";
import { shallow, mount } from "enzyme";
import About from "../pages/About";

test("renders without error", () => {
  const wrapper = shallow(<About />);
  const component = wrapper.find(`[data-test="component-about"]`);
  expect(component.length).toBe(1);
});
test("renders two images from unsplash", () => {
  const wrapper = mount(<About />);
  const images = wrapper.find("img");
  expect(images.length).toBe(2);
});
test("renders two paragraphs", () => {
  const wrapper = mount(<About />);
  const paragraphs = wrapper.find("p");
  expect(paragraphs.length).toBe(2);
});
