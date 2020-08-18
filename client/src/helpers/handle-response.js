import userService from "../services/user-service";

export default (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        userService.logout();
      }

      const error = (data && data.message) || response.statusText;
      console.log(error);
      return Promise.reject(error);
    }

    return data;
  });
};
