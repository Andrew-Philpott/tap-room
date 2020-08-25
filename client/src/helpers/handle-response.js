import userService from "../services/user-service";

export default (response) => {
  console.log(response);
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        userService.logout();
      }

      const error = (data && data.errors) || response.statusText;
      console.log(error);
      return Promise.reject(error);
    }
    return data;
  });
};
