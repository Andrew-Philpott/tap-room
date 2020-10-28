export const initialAuth = {
  userName: "",
  roles: [],
  isAuth: false,
  isAdmin: false,
  userId: 0,
  homeId: 0,
};
export const reviewWithoutLikes = {
  likes: [],
  userId: 1,
  headline: "This is a headline",
  description: "This is a description",
  rating: 2,
  dateCreated: "October 28th 2020 3:18pm",
};
export const mockSetMyReviews = jest.fn();
export const mockSetError = jest.fn();
export const mockUseAuth = (values) =>
  jest.fn().mockReturnValue([values, jest.fn()]);
