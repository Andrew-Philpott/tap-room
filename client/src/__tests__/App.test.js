import React from "react";
import { mount } from "enzyme";
import App from "../App";

const mockSignIn = jest.fn();
const mockSignOut = jest.fn();
const mockGetToken = jest.fn();
const mockGetBeers = (global.fetch = jest.fn(() => Promise.resolve([])));

const setup = () => {
  return mount(
    <App
      signIn={mockSignIn}
      signOut={mockSignOut}
      getToken={mockGetToken}
      userName={""}
      roles={[]}
      isAuth={false}
      isAdmin={false}
    />
  );
};
// test("renders without error", () => {
//   const wrapper = setup();
//   const component = wrapper.find(`[data-test="component-app"]`);
//   expect(component.length).toBe(1);
// });
describe("getBeers calls", () => {
  test("getBeers gets called on app mount", () => {
    setup();
    expect(mockGetBeers).toHaveBeenCalled();
  });
  test("beers does not update on app update", () => {
    const wrapper = setup();
    mockGetBeers.mockClear();
    wrapper.setProps();
    expect(mockGetBeers).not.toHaveBeenCalled();
  });
});
