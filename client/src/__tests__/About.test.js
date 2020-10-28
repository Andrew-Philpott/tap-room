import React from "react";
import { shallow } from "enzyme";
import About from "../pages/About";

describe("<About/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<About />);
  });

  test("renders without error", () => {
    const component = wrapper.find(`[data-test="component-about"]`);
    expect(component.length).toBe(1);
  });
  test("renders two images from unsplash", () => {
    const images = wrapper.find("img");
    expect(images.length).toBe(2);
  });
  test("renders two paragraphs", () => {
    const paragraphs = wrapper.find("p");
    expect(paragraphs.length).toBe(2);
  });
});
