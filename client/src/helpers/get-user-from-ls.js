export default function getUserFromLs() {
  let userString = localStorage.getItem("user");
  let user = null;
  if (userString) {
    user = JSON.parse(userString);
    if (user && user.token) {
      return user;
    } else {
      return null;
    }
  }
  return null;
}
