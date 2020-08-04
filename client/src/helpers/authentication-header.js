import getUserFromLs from "./get-user-from-ls";

export default function authHeader() {
  const user = getUserFromLs();
  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
    };
  } else {
    return { Authorization: "" };
  }
}
