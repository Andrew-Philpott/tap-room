import React from "react";
import { mount } from "enzyme";
import BeerDetail from "../pages/BeerDetail";
import { mockSetError, mockSetMyReviews } from "../testutils";
import beerService from "../other/beer-service";
import { mockUseAuth } from "../testutils";
import AuthContext from "../components/AuthContext";
import { MemoryRouter, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";

const mockGetBeer = jest.fn(() => Promise.resolve());

const setup = ({ setError, myReviews, setMyReviews }) => {
  AuthContext.useAuth = mockUseAuth;
  beerService.getBeer = mockGetBeer;
  return mount(
    <MemoryRouter initialEntries={[`/beers/details/1`]}>
      <Route path="/beers/details/:id">
        <BeerDetail
          setError={setError}
          myReviews={myReviews}
          setMyReviews={setMyReviews}
        />
      </Route>
    </MemoryRouter>
  );
};

describe("<BeerDetail/>", () => {
  test("renders without error", () => {
    let wrapper;
    act(() => {
      wrapper = setup({
        setError: mockSetError,
        myReviews: [],
        setMyReviews: mockSetMyReviews,
      });
    });

    const component = wrapper.find(`[data-test="component-beer-detail"]`);
    expect(component.length).toBe(1);
  });

  describe("getBeer calls", () => {
    test("getBeer gets called on BeerDetail mount", () => {
      act(() => {
        setup({
          setError: mockSetError,
          myReviews: [],
          setMyReviews: mockSetMyReviews,
        });
      });

      expect(mockGetBeer).toHaveBeenCalled();
    });
    // test("renders a message that states no reviews have been written when the number of reviews is zero", () => {
    //   const component = wrapper.find(`[data-test="beer-detail-message"]`);
    //   expect(component.length).toBe(1);
    // });
  });
});
