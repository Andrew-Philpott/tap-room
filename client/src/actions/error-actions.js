import errorConstants from "../constants/error-constants";

export default {
  error,
  clear,
};

function error(message) {
  return { type: errorConstants.ERROR, payload: message };
}

function clear() {
  return { type: errorConstants.CLEAR };
}
