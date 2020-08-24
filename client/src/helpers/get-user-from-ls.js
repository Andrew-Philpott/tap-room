export default function getUserFromLs() {
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    if (user && user.token) {
      return user;
    } else {
      return null;
    }
  }
  return null;
}
