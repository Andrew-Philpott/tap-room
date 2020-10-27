export default (response) => {
  return response.text().then((text) => {
    if (response.status === 500) return Promise.reject(500);
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.validationErrors) || response.statusText;
      return Promise.reject(error);
    }
    return Promise.resolve(data);
  });
};
